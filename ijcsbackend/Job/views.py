from django.http import HttpResponse

from  Job.serializer import JobSerializer
from admins.models import Administrator
from application.models import Application
from .models import *
# from .forms import RegistrationForm 
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login  
from django.contrib import auth
from django.http import HttpResponse
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from rest_framework import generics,status,views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from smtplib import SMTPException
class JobCreateView(APIView):
    queryset = Employer.objects.all()
    serializer_class = JobSerializer

    def post(self, request,employer_id, *args, **kwargs):
        # employer_id = self.kwargs.get('employer_id')
        
        employer=Employer.objects.get(id=employer_id)

        print("employer  =====  ",employer)
        
        # Create an instance of the serializer class
        serializer = self.serializer_class(data=request.data)
         
        print(serializer)
        print(request.data) 
        if serializer.is_valid():
            # Set the employer ID in the serializer data
            serializer.validated_data['employer'] = employer
            
            # Manually save the instance
            serializer.save()
            print(serializer.data)
            print("job posted")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("failed to post job",serializer.errors)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class DeleteJob(APIView):
    def delete(self, request, employer_id, job_id, *args, **kwargs):
        try:
            # Retrieve the job using the employer_id and job_id
            job_to_delete = Job.objects.get(employer__id=employer_id,id=job_id)

            appn=Application.objects.filter(job=job_to_delete).exists()
            print(appn)
            if appn:
                application=Application.objects.get(job=job_to_delete)
                subject = 'Job Application Status Change'
                message = f'''Dear {application.job_seeker.first_name} The Job  {application.job.title} Which you applied is Deleted '''
                recipient_list = ['asebekalu@gmail.com']
                from_email='asebekalu@gmail.com'
                try:
                    send_mail(subject, message, from_email, recipient_list , fail_silently=False)
                except SMTPException as e:
                    print(f'An error occurred: {e}')
            else:
                print("no application")
            
            job_to_delete.delete() 
            
            message={"detail": "Job deleted successfully"}
            return Response(message, status=status.HTTP_204_NO_CONTENT)

        except Job.DoesNotExist:
            print("job not found for ",job_id)
            return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print(str(e))
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class JobDetail(APIView):
    def get(self, request, employer_id, job_id, *args, **kwargs):
        try:
            # Retrieve the job using the employer_id and job_id
            job_detail = Job.objects.get(employer__id=employer_id,id=job_id)
            serializer=JobSerializer(job_detail) 
            return Response({"detail":serializer.data})
        except Job.DoesNotExist:
            return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e: 
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetJobById(APIView):
    def get(self, request,job_id, *args, **kwargs):
        try:
            # Retrieve the job using the employer_id and job_id
            single_job = Job.objects.get(id=job_id)
            serializer=JobSerializer(single_job) 
            return Response(serializer.data)
        except Job.DoesNotExist:
            return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e: 
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CompanyJobDetail(APIView):
    def get(self, request, employer_id, job_id, *args, **kwargs):
        try: 
            company=Employer.objects.get(id=employer_id)
            job_detail = Job.objects.get(id=job_id) 
            serializer=JobSerializer(job_detail)
            company_data={'logo':str(company.logo), 'company_location':company.location,'company_name':company.full_name}
             
            company_data.update(serializer.data)
            
            return Response({"detail":company_data})
        except Job.DoesNotExist:
            return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e: 
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateJob(APIView):
    def patch(self,request,job_id):
        job = Job.objects.get(id=job_id)
        
        serializer = JobSerializer(job, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data) 
        return Response(serializer.errors)
class ApproveJob(APIView):
    def patch(self,request,job_id,admin_id):
        job = Job.objects.get(id=job_id)
        admin=Administrator.objects.get(id=admin_id)
        serializer = JobSerializer(job, data=request.data,partial=True)
        if serializer.is_valid():
            if admin.is_admin:
                serializer.validated_data["status"]="Approved"
            else :
                return Response("You have no authority to Change Status of this Job")
            serializer.save() 
            return Response(serializer.data) 
        return Response(serializer.errors)
class DeclineJob(APIView):
    def patch(self,request,job_id,admin_id):
        job = Job.objects.get(id=job_id)
        admin=Administrator.objects.get(id=admin_id)
        serializer = JobSerializer(job, data=request.data,partial=True)
        
        if serializer.is_valid():
            if admin.is_admin:
                serializer.validated_data["status"]="Declined"
            else :
                return Response("You have no authority to Change Status of this Job")
            serializer.save() 
            return Response(serializer.data) 
        return Response(serializer.errors)
class GetJob(APIView):
    def get(self,request):
        job=Job.objects.all()
        serializer=JobSerializer(job,many=True)
        return Response(serializer.data)

    
def job_search(request):
    search_query = request.GET.get('query', '')
        
    filtered_jobs = Job.objects.filter(
        models.Q(title__icontains=search_query)
        | models.Q(tag__icontains=search_query)
        | models.Q(job_role__icontains=search_query)
    ).distinct()

    serialized_jobs = [
        {
            'title': job.title,
            'job_tag': job.tag,
            'job_role': job.job_role,
            # Add other fields you want to include in the response
        }
            for job in filtered_jobs
        ]

    return JsonResponse({'jobs': serialized_jobs})