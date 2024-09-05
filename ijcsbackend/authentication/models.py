from django.db import models
# Create your models here.

class Authentication(models.Model):
    otp=models.CharField(max_length=6, null=True,blank=True)
    email=models.EmailField(null=True,blank=True)
    timeStamp=models.DateTimeField()