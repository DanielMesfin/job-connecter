from django.http import JsonResponse
from django.shortcuts import HttpResponse, render
from Job.models import Job
from application.models import Application
from Job.serializer import JobSerializer
from rest_framework.views import APIView
from rest_framework import generics,status,views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import *
from .serializer import *
# Create your views here.

class CreateAdmin(generics.CreateAPIView):
    queryset=Administrator.objects.all()
    serializer_class=AdminSerializer
    
    def post(self,request,*args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        print("data :: ",request.data)
        if serializer.is_valid():
            print(serializer)
            self.perform_create(serializer)
            headers=self.get_success_headers(serializer.data)
            return Response(serializer.data,status=status.HTTP_201_CREATED,headers=headers)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
 
class AdminProfileUpdateView(APIView):
    def patch(self, request, *args, **kwargs):
        admin_id = self.kwargs.get('admin_id')
        user_profile = Administrator.objects.get(id=admin_id)
        serializer = UpdateAdminSerializer(user_profile, data=request.data,partial=True)
        
        if serializer.is_valid():
            if request.data['password']=='undefined':
                serializer.validated_data['password'] = user_profile.password
            if "profile_picture" in request.FILES:
                serializer.validated_data['profile_picture']= request.FILES["profile_picture"]
            serializer.save()
             
            return Response(serializer.data, status=status.HTTP_200_OK )
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminLogin(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            admin = Administrator.objects.get(email=email)
            if(password==admin.password):
                
                job_count=Job.objects.count()
                app_count=Application.objects.count()
                
                print("==========================/n")
                print("job and application count",job_count,app_count)
                print("/n==========================")
                
                print('Admin With this',password, '',admin)
                user_data={'id':admin.id}
                serializer = AdminSerializer(admin)
                user_data.update(serializer.data)
                request.session['user_id'] = admin.id
                # print(job_list)
                print(user_data)
                print("employer id : " , admin.id)
                return Response({ 
            'user': user_data,
            
        })
        except Administrator.DoesNotExist:
            print("Admin Does Not Exists")
            pass
        # Authentication failed
        return JsonResponse({
                "message": "I can not help you just go and create account"
            })
class GetJobActivationRequest(APIView):
     def get(self,request,admin_id):
         admin=Administrator.objects.get(id=admin_id) 
         
         job=Job.objects.all().filter(status="Pending")
         for jb in job :
             print(jb.id,"========",JobSerializer(Job.objects.get(id=jb.id)).data)
         serializers=JobSerializer(job,many=True)
         if admin.is_admin:
             print(serializers.data)
             return Response({
                 "job_list":serializers.data,
                
                 })
         else:
             print("not admin")
             return Response("You have no right to get these data")