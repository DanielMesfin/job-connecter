from django.urls import path
from authentication.views import *
from .views import *

urlpatterns = [
    path('raise-issues/<int:job_id>/',RaiseIssue.as_view(),name= 'raise_issue'),
    path('all-issue/<int:job_id>/',AllIssuePerJob.as_view(),name= 'all_issues_perjob'),
    path('all-issue/remove-job/<int:job_id>/',RemoveJob.as_view(),name="remove-job"),
    path('all-issue/',AllIssue.as_view(),name='all_issues'),
]
