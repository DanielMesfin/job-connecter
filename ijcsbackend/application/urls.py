from django.urls import include, path
from .views import  *

urlpatterns = [
    # Other URL patterns
    path('submit-application/', submit_application, name='submit_application'),
    path('job-application/<int:job_id>/', ApplicationDetail.as_view(), name='job_application'),
    path('shortlist/',include('application_shortlist.urls')),
    # path('job-application/<int:employer_id>/', AllApplicationDetail.as_view(), name='all_application'),
    path('job-application/<int:employer_id>/<int:job_id>/', AllApplicationDetail.as_view(), name='all_application'),
    path('job-applicant/<int:app_id>/<int:applicant_id>/', ApplicantDetail.as_view(), name='applicant'),
    path('application-status/<int:appn_id>/',ChangeApplicationStatus.as_view(), name='application_status'),
    path('<int:jobseeker_id>/', get_applications_by_jobseeker, name='get_applications_by_jobseeker'),
]  