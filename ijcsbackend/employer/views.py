from django.http import HttpResponse
from Job.models import Job
from  Job.serializer import JobSerializer
from application.models import Application
from utils.validation import Validation
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
from .serializer import *
from django.core.exceptions import ObjectDoesNotExist
from utils.validation import Validation

class EmployerCreateView(generics.CreateAPIView):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer
   
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print("request data ",request.data)
        if serializer.is_valid():
            print("serializer is valid ",request)
            self.perform_create(serializer) 
            headers = self.get_success_headers(serializer.data)
            message={
                "response":"Profile Created Successfully ! ",
                "suggestion":"Please Complete Your Profile"
            }
            return Response(message, status=status.HTTP_201_CREATED, headers=headers)
        print("invalid serializer",serializer.errors) 
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployerDetailView(generics.RetrieveAPIView):
    def get(self, request,employer_id, *args, **kwargs):
        try:
            # Retrieve the employer using the employer_id
            single_employer = Employer.objects.get(id=employer_id)
            serializer=EmployerSerializer(single_employer) 
            return Response(serializer.data)
        except Job.DoesNotExist:
            return Response( "Job not found", status=status.HTTP_404_NOT_FOUND)

        except Exception as e: 
            return Response( str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class UserProfileUpdateView(APIView):
    def patch(self, request, *args, **kwargs):
        employer_id = self.kwargs.get('employer_id')
        user_profile = Employer.objects.get(id=employer_id)
        serializer = UpdateEmployerSerializer(user_profile, data=request.data,partial=True)
        
        if serializer.is_valid():
            if request.data['password']=='undefined':
                serializer.validated_data['password'] = user_profile.password
            if "logo" in request.FILES:
                serializer.validated_data['logo']= request.FILES["logo"]
            if "banner" in request.FILES:
                serializer.validated_data['banner']= request.FILES["banner"] 
            serializer.save()
             
            return Response(serializer.data, status=status.HTTP_200_OK )
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserProfileDeleteView(APIView):
    def delete(self, request,employer_id, *args, **kwargs): 
        try:
            employer = Employer.objects.get(id=employer_id)
            print(employer)
            employer.delete()
            print("Employer Account Deleted")
            return Response("Employer Account Deleted", status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            print("Employer Account Not Found")
            return Response("Employer Account Not Found", status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(str(e))
            return Response("Failed to Delete Account", status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(views.APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        
        print(email,password)
        try:
            user = Employer.objects.get(email=email)
           
            
            print(user)
            print(user.password , user.email)
            print(check_password(password, user.password))
        except Employer.DoesNotExist:
            return HttpResponse("User does not exist")
        
        if  user.password == password :
            # Log in the user
            # token, created = Token.objects.get_or_create(user=user)
            login(user)
            print("logged in")
            return Response({"message": "login successfull"}, status=status.HTTP_200_OK)
            
            # return HttpResponse("User logged in successfully")
        else:
            print("invalid password")
            return Response({"error": "Invalid username/password"}, status=status.HTTP_400_BAD_REQUEST)

class Fetch_Job(views.APIView):
    def get(self, request, *args, **kwargs):
        employer_id = self.kwargs.get('employer_id')
         
        employer= Employer.objects.get(id=employer_id)
        jobs=[]
        if employer :
            
            job=list(Job.objects.all().filter(employer=employer.id).values())
            # print(job.values())
            # job_list=[]
            # job_list = list(Job.objects.filter(employer=employer.id).values())
            
            if job:
                for jb in job:
                    print(jb['id'])
                    number_application=Application.objects.all().filter(job_id=jb['id'])
                   
                    jobs.append({
                        'job':jb,
                        'number_application':number_application.count()})
                return Response({
                    'job_list':jobs
        })
            else :
                
                print("No Job posted yet")
                
                return Response({
                    'msg':"No Job posted yet"
        })
        else:
            print("cant find employer")
            return Response({
                    'msg':"cant find employer"
        })
            
class JobCreateView(views.APIView):
    queryset = Employer.objects.all()
    serializer_class = JobSerializer
   
    def create(self, request, *args, **kwargs):
        employer_id = self.kwargs.get('employer_id')
        profile_full=Validation.is_user_fully_filled(employer_id,Employer)
        
        
        serializer = self.get_serializer(data=request.data)
        
        print("request data ",request.data)
        if serializer.is_valid():
            print("serializer is valid ",request)
            serializer.validated_data['employer'] = employer_id
            title = serializer.validated_data.get('title')
            
            tag = title.lower().replace(" ", "_")  #  Convert title to lowercase and replace spaces with underscores

            # Set the generated tag value
            serializer.validated_data['tag'] = tag
            
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        print("invalid serializer",serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckProfile(APIView):
    def get(self,request,employer_id):
         print(employer_id)
         profile_full=Validation.is_user_fully_filled(employer_id,Employer)
         print(profile_full)
         return Response(profile_full, status=status.HTTP_201_CREATED)
# def register(request):
#     return HttpResponse("response")

#     if request.method=='GET':
#         csrf_token = get_token(request)
#         print(csrf_token)
#         return  HttpResponse(csrf_token)
#     if request.method == 'POST':
#         form=RegistrationForm(request.POST,request.FILES)
#         print(form)
#         try:
#             if form.is_valid():
#                 first_name=form.cleaned_data['first_name']
#                 username=form.cleaned_data['username']
#                 email=form.cleaned_data['email']
#                 phone=form.cleaned_data['phone']
#                 location=form.cleaned_data['location']
#                 logo=form.cleaned_data['logo']
#                 banner=form.cleaned_data['banner']
#                 about=form.cleaned_data['about']
#                 organizationType=form.cleaned_data['organizationType']
#                 industryType=form.cleaned_data['industryType']
#                 yearOfStablishment=form.cleaned_data['yearOfStablishment']
#                 portifolio=form.cleaned_data['portifolio']
#                 vision=form.cleaned_data['vision']
#                 numberOfEmployees=form.cleaned_data['numberOfEmployees']
#                 socialMediaLink=form.cleaned_data['socialMediaLink']
#                 password=form.cleaned_data['password']
                
                
                
                
#                 print(first_name)
#                 print(email)
#                 print(password)
                
#                 print(location)
#                 print(logo)
#                 print(banner)
#                 print(about)
#                 print(organizationType)
#                 print(industryType)
#                 print(yearOfStablishment)
#                 print(portifolio)
#                 print(vision)
#                 print(numberOfEmployees)
#                 print(socialMediaLink)

#                 user=Employer.objects.create_user(first_name=first_name,username=username,email=email,phone=phone,location=location,
#                                                   logo=logo,banner=banner,about=about,organizationType=organizationType,
#                                                   industryType=industryType,yearOfStablishment=yearOfStablishment,portifolio=portifolio,
#                                                   vision=vision,numberOfEmployees=numberOfEmployees,socialMediaLink=socialMediaLink,
#                                                   password = password)
#                 # print(user)
#                 user.save()
#                 return HttpResponse("Successfully Registered")
#             else:
#                 print("form is not valid")
#                 print(form.errors)
#                 return HttpResponse("form is not valid")
            
#         except Exception as e:
#             print(str(e.args))
#             # return HttpResponse(request,e)
#         return HttpResponse("adjfajj")
    
    

# def login_employer(request):
#     if request.method == 'POST':
#         email = request.POST['email']
#         password = request.POST['password']
        
#         print(email,password)
        
#         try:
#             user = Employer.objects.get(email=email)
#             print(user)
#         except Employer.DoesNotExist:
#             return HttpResponse("User does not exist")

#         if check_password(password, user.password):
#             # Log in the user
#             return HttpResponse("User logged in")
#         else:
#             return HttpResponse("Invalid password")
#     else:
#         # Render the login form
#         # return render(request, 'login.html')
#         pass