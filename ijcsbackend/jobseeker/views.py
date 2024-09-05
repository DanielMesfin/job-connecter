from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.decorators import action
from django.views.decorators.http import require_http_methods

from rest_framework import status
import json
from rest_framework.decorators import action
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password

from django.http import HttpResponse
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
from django.db.models import Q
from django.core.mail import send_mail
from django.conf import settings
from .models import *
from .serializers import JobSeekerSerializer 
from .serializers import *
from utils.validation import Validation
# Jobseeker views here.
       
class JobSeekerCreateView(viewsets.ModelViewSet):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
       
        if serializer.is_valid():
            self.perform_create(serializer)
            
            # Send verification email
            user = serializer.instance
            verification_token = Validation.generate_token()  # Replace with your token generation logic
            user.verification_token = verification_token
            user.save()
            
            # Validation.verify_email(verification_token,user.email)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def check_existence(self, email, phone):
        exists = JobSeeker.objects.filter(email=email).exists() or JobSeeker.objects.filter(phone=phone).exists()
        return exists


class JobSeekerUpdateView(APIView):
    def patch(self, request, *args, **kwargs):
        jobseeker_id = self.kwargs.get('pk')
        print("ID is from front end " + str(jobseeker_id))
        jobseeker = JobSeeker.objects.filter(id=jobseeker_id).first()
        print(jobseeker)
        print(request.data)

        if jobseeker:
            for key, value in request.data.items():
                if key == 'educations':
                    value = json.loads(value)
                if key == 'socialMediaLink':
                    value = json.loads(value)
                if key == 'skills':
                    value = value.split(',')
                
                setattr(jobseeker, key, value)
            
            jobseeker.save()
            
            return Response({"message": "Job seeker updated successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Job seeker not found."}, status=status.HTTP_404_NOT_FOUND)