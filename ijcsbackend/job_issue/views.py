from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics,status,views
from rest_framework.views import APIView
from .models import JobIssue
from Job.serializer import JobSerializer
from employer.serializer import EmployerSerializer
from .serializer import *
# Create your views here.


class RaiseIssue(generics.CreateAPIView): 
    def post(self,request, *args, **kwargs):
        
        data = request.data
        job_id = kwargs.get('job_id')
        issue=data['reason']
        try:
            job=Job.objects.get(id=job_id)
            JobIssue.objects.create(job=job,issue=issue)
            return Response('Job Issue raised successfully')
        except Exception as e:
            print("Error while raising an issue", str(e))
            return Response('An error occurred while raising the issue.')
       
class AllIssuePerJob(APIView):
    def get(self,request, job_id):
        print(job_id)
        """Return a list of all issues for a given job"""
        try:
            job = JobIssue.objects.filter(job=job_id)
            serializer = JobIssueSerializer(job,many=True)
            return Response(serializer.data)
        except JobIssue.DoesNotExist:
            return HttpResponse(status=404)
# class AllIssue(APIView):
#     def get(self,request,*args,**kwargs):
#         """Return a list of all issues for a given job"""
#         try:
#             job_issue = JobIssue.objects.all()
        
#             serializer = JobIssueSerializer(job_issue, many=True)
            
#             job_data=[]
#             for job in job_issue:
#                 # job_data=Job.objects.get(job.id)
#                 job_datas = JobSerializer(job.job)
#                 company=EmployerSerializer(job.job.employer)
#                 number_issue=JobIssue.objects.filter(job=job.id).count()
                
#                 job_data.append({
#                     'issue': job.issue,
#                     'job': job_datas.data,
#                     'number of issue':number_issue,
#                     'company':{"logo":company.data['logo'],"name":company.data['full_name']}
#                 })
#                 print("number of issue",number_issue)
#             return Response({"job_issue":job_data})
#         except JobIssue.DoesNotExist:
#             return HttpResponse(status=404)
# class AllIssue(APIView):
#     def get(self, request, *args, **kwargs):
#         try:
#             job_issues = JobIssue.objects.all()
#             job_data = []
    
#             # Create a dictionary to keep track of the number of issues for each job
#             job_issue_count = {}
            
#             for job_issue in job_issues: 
#                 job = job_issue.job
                
#                 # Check if the job has already been encountered
#                 if job.id not in job_issue_count:
#                     job_issue_count[job.id] = JobIssue.objects.filter(job=job.id).count()
                    
#                     job_data.append({
#                         'issue': job_issue.issue,
#                         'job': JobSerializer(job).data,
#                         'number_of_issue': job_issue_count[job.id],
#                         'company': {
#                             "logo": EmployerSerializer(job.employer).data['logo'],
#                             "name": EmployerSerializer(job.employer).data['full_name']
#                         }
#                     })
#             return Response({"job_issue": job_data})
        
#         except JobIssue.DoesNotExist:
#             return HttpResponse(status=404)

class AllIssue(APIView):
    def get(self, request, *args, **kwargs):
        try:
            job_issues = JobIssue.objects.all()
            
            job_data = {}
            
            for job_issue in job_issues:
                job = job_issue.job
                
                # Check if the job has already been encountered
                if job.id not in job_data:
                    job_data[job.id] = {
                        'job': JobSerializer(job).data,
                        'number_of_issue': 1,
                        'company': {
                            "logo": EmployerSerializer(job.employer).data['logo'],
                            "name": EmployerSerializer(job.employer).data['full_name']
                        },
                        'issues': [job_issue.issue]  # Initialize list of issues for the job
                    }
                else:
                    job_data[job.id]['number_of_issue'] += 1
                    job_data[job.id]['issues'].append(job_issue.issue)  # Add issue to the list
                    
            return Response({"job_issue": list(job_data.values())})
        
        except JobIssue.DoesNotExist:
            return HttpResponse(status=404)

class RemoveJob(APIView):
    def patch(self,request,job_id,*args, **kwargs):
        try:
            reason=request.data['reason']
            job=Job.objects.get(id=job_id)
            serializer=JobSerializer(job,data=request.data,partial=True)

            if serializer.is_valid():
                serializer.validated_data['status']='Removed'
                serializer.validated_data['reason']=reason
                serializer.save()
                print(job_id,request.data['reason'],serializer.data)
                return Response("")
            return Response(serializer.errors)
        except:
            return Response("")