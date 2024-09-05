from . import views
from django.contrib import admin
from django.urls import include, path
from employer.views import *

urlpatterns = [
    path('register/', EmployerCreateView.as_view(), name='register'),
    path('<int:employer_id>/', EmployerDetailView.as_view(),name="employer_detail"),
    path('update/<int:employer_id>/', UserProfileUpdateView.as_view(), name='update_employer'),
    path('delete/<int:employer_id>/', UserProfileDeleteView.as_view(), name='delete_employer'),
    path('check_profile/<int:employer_id>/',CheckProfile.as_view(),name="check_profile"),
    path('login/',LoginView.as_view(),name="login"),
    path('jobs/<int:employer_id>/',Fetch_Job.as_view(),name='Job'), 
]
