from django.db import models
from employer.models import Employer
# Create your models here.

class Job(models.Model):
    STATUS={
        
        ('Approved','Approved'),
        ('Pending','Pending'),
        ('Declined','Declined'),
        ('Removed','Removed'),
        ('Expired','Expired'),
        
    }
    employer=models.ForeignKey(Employer, on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    post_date=models.DateField()
    tag=models.JSONField(blank=True)
    
    education=models.CharField(max_length=100,blank=True,null=True)
    job_level=models.CharField(max_length=100,blank=True,null=True)
    # is_favorite= models.BooleanField(default=False)

    vacancies=models.CharField(max_length=10,null=True)
    req_experience=models.CharField(max_length=10,null=True)
    job_type=models.CharField(max_length=100,null=True)
    job_category=models.CharField(max_length=100,null=True)
    deadline=models.DateField()
    
    location=models.JSONField(null=True)
    job_benefits=models.JSONField(null=True)
    job_role=models.CharField(max_length=200,blank=True,null=True)
    job_description=models.CharField(max_length=1000)
    salary=models.JSONField(null=True)
    responsiblity=models.JSONField(null=True)
    required_skill=models.JSONField(null=True)
    status = models.CharField(max_length=10, choices=STATUS, default="Pending")
    reason=models.CharField(max_length=3000,null=True, blank=True)
    
    
    
    
