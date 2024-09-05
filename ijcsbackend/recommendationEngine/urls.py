from django.urls import path
from .views import fetch_simmilar_job, recommend_jobs, recommend_job_seekers, recommend_jobs_for_each_skill, recommend_jobs_o

urlpatterns = [
    path('recommend_jobs/<int:job_seeker_id>/', recommend_jobs, name='recommend_jobs'),
    path('recommend_job_seekers/<int:job_id>/', recommend_job_seekers, name='recommend_job_seekers'),
    path('recommend_jobs_o/<int:_id>/', recommend_jobs_o, name='recommend_jobs_o'),
    path('fetch_simmilar_job/<int:selectedJobId>/',fetch_simmilar_job, name='fetch_simmilar_job'),
    path('recommend_jobs_for_each_skill/<int:job_seeker_id>/',recommend_jobs_for_each_skill,name="recommend_jobs_for_each_skill")
]
