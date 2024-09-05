from admins.views import *
from django.urls import path

urlpatterns = [
    path('create/',CreateAdmin.as_view(), name='create'),
    path('login/',AdminLogin.as_view(), name='login'),
    path('update/<int:admin_id>/',AdminProfileUpdateView.as_view(), name='update'),
    path('get_job_activation_request/<int:admin_id>/',GetJobActivationRequest.as_view(), name='get_job'),
]
