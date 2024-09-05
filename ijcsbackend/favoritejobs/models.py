from django.db import models
from jobseeker.models import JobSeeker
from Job.models import Job
# Create your models here.
class Favorite(models.Model):
    job_seeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['job_seeker', 'job']  # Ensure only one favorite per user and job