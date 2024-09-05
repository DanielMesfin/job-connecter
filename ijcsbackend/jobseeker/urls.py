from django.urls import path
from .views import JobSeekerCreateView,JobSeekerUpdateView

urlpatterns = [
    path('register/', JobSeekerCreateView.as_view({'post': 'create'}), name='create-jobseeker'),
    path('vfe/<str:verification_token>/', JobSeekerCreateView.as_view({'patch': 'verify_email'}), name='verify_email'),
    path('all/', JobSeekerCreateView.as_view({'get': 'list'}), name='create-jobseeker'),
    path('all/<int:pk>/', JobSeekerCreateView.as_view({'get': 'retrieve'}), name='retrieve-jobseeker'),
    path('update/<int:pk>/', JobSeekerUpdateView.as_view(), name='jobseeker-update')
]