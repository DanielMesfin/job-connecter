from queue import Full
from .serializers import *
from django.core.exceptions import ValidationError
from .models import Application, Job, JobSeeker

from jobseeker.serializers import JobSeekerSerializer4ApplicantDetail
from application_shortlist.models import ApplicationShortList
from application_shortlist.serializer import ApplicationShortListSerializer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

from rest_framework.views import APIView
from rest_framework import generics,status,views
from rest_framework.response import Response
from recommendationEngine.views import get_job_seeker_recommendations
from django.core.mail import send_mail
from smtplib import SMTPException

@csrf_exempt
def submit_application(request):
    if request.method == 'POST':
        jobseeker_id = request.POST.get('jobseekerId')
        job_id = request.POST.get('jobId')
        resume = request.FILES.get('resume')
        cover_letter = request.POST.get('cover_letter')

        # Assuming you have retrieved the JobSeeker and Job objects based on the IDs
        jobseeker = JobSeeker.objects.get(id=jobseeker_id)
        job = Job.objects.get(id=job_id)

        # Check if the job seeker has already applied to the job
        existing_application = Application.objects.filter(job=job, job_seeker=jobseeker).exists()
        if existing_application:
            return JsonResponse({'status': 'error', 'message': 'You Have Already Applied To This Job!'})

        # Create a new Application object
        application = Application(job=job, job_seeker=jobseeker, cover_letter=cover_letter, resume=resume)
        # Set other fields of the Application object based on the form data

        # Save the application
        application.save()

        # Return a JSON response indicating success
        return JsonResponse({'status': 'success','message': 'Application Submited Successfully!'})
    elif request.method == 'GET':
        jobseeker_id = request.GET.get('jobseekerId')

        if jobseeker_id:
            # Retrieve applications for the specified job seeker
            applications = Application.objects.filter(job_seeker_id=jobseeker_id)
        else:
            # Retrieve all applications
            applications = Application.objects.all()

        # Convert applications to dictionaries
        application_data = []
        for application in applications:
            application_dict = {
                'id': application.id,
                'job_title': application.job.title,
                'jobseeker_id': application.job_seeker_id,
                'job_id': application.job_id,
                'first_name': application.job_seeker.first_name,
                'cover_letter': application.cover_letter,
                # 'resume':application.resume
                'resume': str(application.resume)
                # Add other relevant fields as needed
            }
            application_data.append(application_dict)

        # Prepare the response data
        response_data = {
            'status': 'success',
            'applications': application_data
        }
        # Return a JSON response with the list of applications
        return JsonResponse(response_data)
    else:
        # Return a JSON response indicating failure
        return JsonResponse({'status': 'error'})
class ApplicationDetail(APIView): 
    def get(self,request,job_id,*args, **kwargs):
        application_data=[]
        application=list(Application.objects.all().filter(job__id=job_id).values())
        
        for js in application:
            # print(js['job_seeker_id'])
            job_seeker=JobSeeker.objects.get(id=js['job_seeker_id'])
            job_seeker_data={
                'app_id':js['id'],
                'job_seeker_id':js['job_seeker_id'],
                'profile_picture':str(job_seeker.profile_picture),
                'full_name':job_seeker.first_name +" "+job_seeker.last_name,
            }
            application_data.append(job_seeker_data)
            print(job_seeker_data)
        
        if application:
            return Response(application_data)
        return Response("There is no application for the specified job") 
    
class AllApplicationDetail(APIView):
    def get(self,request,employer_id,job_id,*args, **kwargs):
        print(employer_id,job_id)
        application=[] 
        application_list=[] 
        short_listed=ApplicationShortList.objects.all().values()
        
        if job_id==00: 
            job=Job.objects.all().filter(employer_id=employer_id).values()
            for jb in job:
                appn=list(Application.objects.all().filter(job_id=jb['id']).values()) 
                for apps in appn: 
                    if apps:
                        application.append(apps)
                    else:
                        continue
            print("================================")
            print(short_listed)
            print("================================")
        else:
            application=list(Application.objects.all().filter(job__id=job_id).values())
            
            print(application)
            print("================================")
            print(short_listed)
            print("================================")
            
            print( get_job_seeker_recommendations(job_id))
            
        if application:
            for app in application:
                serializer=JobSeekerSerializer4ApplicantDetail( JobSeeker.objects.get(id=app['job_seeker_id']))
                print(ApplicationShortList.objects.filter(application_id=app['id']).exists())
                application_list.append({
                    'job_seeker':serializer.data,
                    'application':app,
                    'short_listed':ApplicationShortList.objects.filter(application_id=app['id']).exists(),
                    'recommended' : any(appns.get('id') == app['id'] for appns in get_job_seeker_recommendations(job_id)) if job_id!=00 else None
                                         })
            return Response( {"application":list(application_list)})
        return Response("There is no application for the specified job")
     
class ApplicantDetail(APIView):
    def get(self,request,app_id,applicant_id,*args, **kwargs):
        
        app=Application.objects.get(id=app_id,job_seeker_id=applicant_id)
        application=ApplicationSerializer(app)
        
        if application:
            applicant=JobSeeker.objects.get(id=applicant_id)
            serializer=JobSeekerSerializer4ApplicantDetail(applicant)
            applicant_info={
                'applicant':serializer.data,
                'profile_picture':str(applicant.profile_picture),
                'resume':str(application['resume']),
                'cover_letter':str(application['cover_letter']),
                'short_listed':ApplicationShortList.objects.filter(application_id=app.id).exists(),
                 
            }
            
            print(applicant_info)
            print(applicant_info)
            return Response({'application':applicant_info})
        else:
            return Response({'error':"There is no application for the specified job"}, status=status.HTTP_404_NOT_FOUND)

def get_applications_by_jobseeker(request, jobseeker_id):
    applications = Application.objects.filter(job_seeker_id=jobseeker_id)

    application_data = []
    for application in applications:
        application_dict = {
            'id': application.id,
            'job_title': application.job.title,
            'job_type': application.job.job_type,
            'job_category': application.job.job_category,
            'location': application.job.location,
            'salary': application.job.salary,
            'jobseeker_id': application.job_seeker_id,
            'job_id': application.job_id,
            'first_name': application.job_seeker.first_name,
            'cover_letter': application.cover_letter,
            'resume':str(application.resume),
            'applied_date': application.application_date,
            'application_status':application.application_status
            # Add other relevant fields as needed
        }
        application_data.append(application_dict)

    response_data = {
        'status': 'success',
        'applications': application_data
    }

    return JsonResponse(response_data)

class ChangeApplicationStatus(APIView):
    def patch(self,request,appn_id,*args, **kwargs):
        try:
            application=Application.objects.get(id=appn_id)
           
            
            
            serializer=ApplicationSerializer(application,data=request.data,partial=True) 
            print("email :",application.job)
        
            if serializer.is_valid():
                serializer.validated_data['application_status']='RJ'
                serializer.save()
                subject = 'Job Application Status Change'
                message = f'''Dear {application.job_seeker.first_name} we are sorry to infrom you That  your  application for {application.job.title} Position is Rejected'''
                recipient_list = ['asebekalu@gmail.com']
                from_email='asebekalu@gmail.com'
                try:
                    send_mail(subject, message, from_email, recipient_list , fail_silently=False)
                except SMTPException as e:
                    print(f'An error occurred: {e}')
            
                print(serializer.data)
                return Response({"application for : ",appn_id})
            print(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            print("Error",str(e))
            return Response({"application for : ",appn_id})
