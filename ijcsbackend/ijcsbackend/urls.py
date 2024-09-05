from django.contrib import admin
from django.urls import path,include
from django.conf import settings 
from django.conf.urls.static import static
from django.urls import re_path, path
from employer.views import *
from Job.views import *
from authentication.views import  *
from show_available_routes.views import show_available_routes
from application.views import submit_application
from utils.validation import *
from jobseeker.views import JobSeekerCreateView,JobSeekerUpdateView
from rest_framework import routers

# route = routers.DefaultRouter()
# route.register("jobseeker", JobSeekerCreateView, basename='jobseekerview')

urlpatterns = [
    path('',show_available_routes),
    path('admin/', admin.site.urls),
    path('admins/', include('admins.urls')),
    path('favorite/',include('favoritejobs.urls')),
    path('applications/', include('application.urls')),
    path('user/employer/',include('employer.urls') ),
    path('job/',include('Job.urls')),
    # path('candidate/', include(route.urls)),
    path('candidate/', include("jobseeker.urls")),
    # path('candidate/<int:pk>/update/',JobSeekerUpdateView.as_view(), name='jobseeker-update'),
    path('user/login',LoginView.as_view(),name="user-login"),
    path('user/send-otp',SendOTP.as_view(),name="send-otp"),
    path('user/check-otp',CheckOTP.as_view(),name="check-otp"),
    path('user/reset-password',ResetPassword.as_view(),name="check-otp"),
    path('verify/<str:email>/<str:token>/',ValidateEmail().as_view(),name="verify-account"),
    path('send-verification/<str:email>/',SendVerification().as_view(),name="send-verification"),
    path('recommendation/',include('recommendationEngine.urls')),
    path('job_issue/',include('job_issue.urls'),name='job_issue'),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

