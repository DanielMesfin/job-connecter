from datetime import timedelta
from django.utils import timezone
import json
from django.shortcuts import render
from admins.models import Administrator
from admins.serializer import AdminSerializer
from application.models import Application
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from .models import * 
from jobseeker.models import JobSeeker
from employer.models import Employer
from Job.models import Job
from jobseeker.serializers import JobSeekerSerializer
from employer.serializer import EmployerSerializer, UpdateEmployerSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from utils.validation import Validation
import random
import string
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from .models import Authentication
from .serializer import Authentication
from django.shortcuts import get_object_or_404
 
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
      
        try:
            job_seeker = JobSeeker.objects.get(email=email)
            if job_seeker:
                
                if password == job_seeker.password:
                    if job_seeker.email_verified:  # Check if the user is verified
                        serializer = JobSeekerSerializer(job_seeker)
                        return JsonResponse(serializer.data)
                    else:
                        return Response(
                            {"message": "Your account is not verified."},
                            status=status.HTTP_401_UNAUTHORIZED
                        )
                else:
                    pass
        except JobSeeker.DoesNotExist:
            pass
        # Next, attempt authentication against the JobSeeker table
        try:
            user = JobSeeker.objects.get(email=email)
            if user.password == password:
                if user.email_verified:  # Check if the user is verified
                    return Response(
                        {"is_job_seeker": user.is_job_seeker, "id": user.id},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {"error": "Your account is not verified."},
                        status=status.HTTP_401_UNAUTHORIZED
                    )
            else:
                pass
        except JobSeeker.DoesNotExist:
            pass
        try:
            employer = Employer.objects.get(email=email)
            if employer:
                if password==employer.password:
                    if employer.email_verified:
                        job=Job.objects.filter(employer=employer)
                        application_no = 0
                        
                        for jb in job:
                            application_no+=Application.objects.filter(job_id=jb.id).count()
                        
                        profile_full=Validation.is_user_fully_filled(employer.id,Employer)
                
                        print(employer , "profile fullly set",profile_full)
                        
                        print("=========================")
                        print(job.count(),application_no)
                        print("=========================")
                        
                        
                        # login(request,email)
                        print("employer logo",employer.logo)
                        print('Employer With this',password, '',employer)
                        user_data={
                            'id':employer.id,
                            'profile_full':profile_full,
                            'applications_no':application_no,
                            'job_no':job.count()
                            }
                        serializer = EmployerSerializer(employer)
                        user_data.update(serializer.data)
                        request.session['user_id'] = employer.id 
                        print(user_data)
                        print("employer id : " , employer.id)
                        refresh = RefreshToken.for_user(employer)
                        
                        print(refresh)
                        return Response({
                    
                    'user-type':'Employer',
                    'user': user_data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
                    else:
                        return Response(
                            {"message": "Your account is not verified."},
                            status=status.HTTP_401_UNAUTHORIZED
                        )
                else:
                    return Response(
                            {"message": "Incorrect password"},
                            status=status.HTTP_403_UNAUTHORIZED
                        )
                # return JsonResponse({'response':serializer.data,'data':job_list , 'user':'Employer'}) 
        except Employer.DoesNotExist:
            print("Employer Does Not Exists")
            pass
        try:
            admin = Administrator.objects.get(email=email)
            print(admin)
            if(password==admin.password):
                job_count=Job.objects.count()
                app_count=Application.objects.count()
                emp_count=Employer.objects.count()
                job_seeker_count=JobSeeker.objects.count()
                
                
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
                'user-type':'Admin',
                'user': user_data,
                'info':{ 
                "job_count":job_count,
                 "app_count":app_count,
                 "emp_count":emp_count,
                 "job_seeker_count":job_seeker_count
                }
        })
        except Administrator.DoesNotExist:
            print("Admin Does Not Exists")
            pass
        # Authentication failed
        return JsonResponse({
                "message": "User doesnot exist , Please Create New Account or check your inputs"
            })
class SendOTP(APIView):
    def post(self, request, *args, **kwargs):
        user_found = False
        user_email = request.data.get('email')

        emp = Employer.objects.filter(email=user_email).exists()
        jb_seeker = JobSeeker.objects.filter(email=user_email).exists()

        user_found = emp or jb_seeker

        if user_found:
            characters = string.ascii_letters + string.digits + string.punctuation
            otp_code = get_random_string(6, allowed_chars=characters)

            timeStamp=timezone.now()
            time_window = timedelta(minutes=20)
            time_limit = timeStamp + time_window
            
            pwd_reset_info = Authentication.objects.create(otp=otp_code, email=user_email, timeStamp=timeStamp)
            
            subject = 'OTP Code for IJC'
            message = f'''Your otp code is : {otp_code}\n Please insert the above OTP code into the designated space provided in the system interface before it expires in 20 minutes to proceed with resetting your password.
Be sure not to share or allow others to see this code, as it is a confidential verification method. Safeguarding the confidentiality of this OTP helps maintain the security of your account and ensures the protection of your personal information.'''
            from_email = 'attobekalu@gmail.com'
            recipient_list = ['asebekalu@gmail.com']

            send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        else:
            print("User does not exist")

        print("OTP code:", otp_code)
        print("OTP stored in session:", request.session.get('otp'))

        print("=========================")
        print("User email :", user_email)
        print("otp code :", otp_code)
        print("current time :", timeStamp)
        print("=========================")
        

        response = Response({
            'status': user_found,
        })

        response.set_cookie('otp', otp_code, max_age=300)
        print(response.cookies)
        return response
        
class CheckOTP(APIView):
    def post(self, request):
        valid_otp = False
        otp_code = request.data['otp']
        email = request.data['email']  # Assuming you receive the email in the request data

        otp_obj = Authentication.objects.filter(email=email).last()  # Retrieve the latest OTP for the given email

        if otp_obj:
            otp_generation_time = otp_obj.timeStamp
            time_difference = timezone.now() - otp_generation_time
            if time_difference <= timedelta(minutes=20):
                if otp_code == otp_obj.otp:
                    valid_otp = True
                    print("Valid OTP",otp_code)
                    otp_obj.delete()  # Delete the OTP from the database
                else:
                    print("Invalid OTP")
            else:
                print("OTP expired")
                otp_obj.delete()  # Delete the expired OTP from the database
        else:
            print("No OTP found for the given email")

        return Response({'status': valid_otp})
      
class ResetPassword(APIView):
    def patch(self, request):
        email=request.data['email']
        password=request.data['password']
        # TODO: solve the problem for maching query doesn't found for one when the other got value to return
        try: 
            
            js= JobSeeker.objects.filter(email=email).first()
            emp=Employer.objects.filter(email=email).first() 
            
            if js:
                print(js)
                serializer = UpdateEmployerSerializer(js, data=request.data,partial=True)
                if serializer.is_valid():
                    serializer.save()
                else :
                    print(serializer.errors)
            if emp:
                print(emp)
                serializer = JobSeekerSerializer(emp, data=request.data,partial=True)
                if serializer.is_valid():
                    serializer.validated_data['password'] = password    
                    serializer.save()
                    print("successfull")
                else :
                    print(serializer.errors)
            else:
                return Response("password Reset Failed")
            
            print(email, password)
        except Exception as e:
            print(str(e))
        return Response("")
    
class ValidateEmail(APIView):
    def patch(self,request,email,token):
    # Retrieve the user's account based on the verification token
        email = email
        verification_token = token
        
        print("from verify email",email,verification_token)
        try:
            job_seeker=JobSeeker.objects.get(email=email,verification_token=verification_token) 
            if not job_seeker.email_verified:
                job_seeker.email_verified = True
                job_seeker.save()
                print("Job seeker Email verification successful")
                return JsonResponse({"message": "Email verification successful"})
            else:
                print("Job seeker Email already verified")
                return JsonResponse({"message": "Email already verified"})
        except:
            try:
                employer=Employer.objects.get(email=email,verification_token=verification_token) 
                if not employer.email_verified:
                    employer.email_verified = True
                    employer.save()
                    print("Employer Email verification successful")
                    return JsonResponse({"message": "Email verification successful"})
                else:
                    print("Employer Email already verified")
                    return JsonResponse({"message": "Email already verified"})
            except:
                return JsonResponse({"message": "Email verification failed"})
        
class SendVerification(APIView):
    def patch(self,request,email):
        email = email
        user=''
        print("from send verification to  email",email)
       
        verification_token = Validation.generate_token() # generating vefication token
        try:
            job_seeker= JobSeeker.objects.get(email=email)
            if job_seeker:
                serializer=JobSeekerSerializer(job_seeker)
                job_seeker.verification_token=verification_token
                user=serializer.instance
                Validation.send_verification_email(user.email,verification_token) #sending verification code to  email
                job_seeker.save()
                print("Job seeker Email  sent successful")
                return JsonResponse({"message": "Email  sent successful"})
        except:
            try:
                employer=Employer.objects.get(email=email)
                if employer:
                    serializer=EmployerSerializer(employer)
                    user=serializer.instance
                    employer.verification_token=verification_token
                    Validation.send_verification_email(user.email,verification_token) #sending verification code to  email
                    employer.save()
                    print("Employer Email  sent successful")
                    return JsonResponse({"message": "Email  sent successful"})
            except:
                return JsonResponse({"message": "Failed to send Email verification failed"})
        
          
            
            
        