from django.urls import path
from .views import toggle_favorite,get_favorite_jobs,get_favorite_job_by_id

urlpatterns = [
    path('toggle_favorite_job/', toggle_favorite, name='toggle_favorite'),
    path('get_favorite_job/', get_favorite_jobs, name='get_favorite_job'),
    path('get_favorite_job_by_id/<int:favorite_id>/', get_favorite_job_by_id, name='get_favorite_job_by_id'),
]