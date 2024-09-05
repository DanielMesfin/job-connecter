from django.db import models
from employer.models import Employer
from jobseeker.models import JobSeeker
from application.models import Application


class Message(models.Model):
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE )
    jobseeker = models.ForeignKey(Application, on_delete=models.CASCADE )
    room = models.ForeignKey(JobSeeker, on_delete=models.CASCADE )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    haveseen= models.BooleanField(default=False)
    sender = models.TextField()
    filepath=models.FileField(upload_to="message/file" ,null=True , blank=True)
