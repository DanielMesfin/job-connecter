from django.db import models
from Job.models import Job
# Create your models here.

class JobIssue(models.Model):
    job=models.ForeignKey(Job,on_delete=models.CASCADE)
    issue = models.CharField(max_length=300)
    
    # def __str__(self):
    #     return self.issue + " - "+ str(self.job)  # String for a representation of the object.
        

 