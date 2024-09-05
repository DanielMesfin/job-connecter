from django import views
from django.contrib import admin
from django.urls import include, path
from .views import *
from . import views

urlpatterns = [
    path('post/<int:employer_id>/', JobCreateView.as_view(), name='post'),
    path('get_jobs/',GetJob.as_view(),name="get_job"),
    path('get_jobs/<int:job_id>/',GetJobById.as_view(),name="get_job"),
    path('delete_job/<int:employer_id>/<int:job_id>/',DeleteJob.as_view(),name="delete_job"),
    path('approve_job/<int:admin_id>/<int:job_id>/',ApproveJob.as_view(),name="approve_job"),
    path('decline_job/<int:admin_id>/<int:job_id>/',DeclineJob.as_view(),name="decline_job"),
    path('job_detail/<int:employer_id>/<int:job_id>/',JobDetail.as_view(),name="job_detail"),
    path('company_job_detail/<int:employer_id>/<int:job_id>/',CompanyJobDetail.as_view(),name="company_job_detail"),
    path('update/<int:job_id>/',UpdateJob.as_view(),name="update_job"),
    path('search/', views.job_search, name='job_search'),
]
