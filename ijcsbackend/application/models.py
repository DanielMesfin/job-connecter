from django.db import models
from jobseeker.models import JobSeeker
from Job.models import Job
from django.utils import timezone

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    job_seeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField()
    application_date = models.DateTimeField(default=timezone.now)
    application_status = models.CharField(
        max_length=50,
        choices=(
            ('AP', 'Applied'),
            ('IN', 'Accepted'),
            ('RJ', 'Rejected'),
        ),
        default='AP'
    )
    
    def __str__(self):
        return f"Application for {self.job.title} by {self.cover_letter}"
    
    def job_title(self):
        return self.job.title
    
    
    def company(self):
        return self.job.employer.full_name