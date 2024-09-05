from django.db import models
from application.models import Application
# Create your models here.
class ApplicationShortList(models.Model):
    application_id=models.ForeignKey(Application,on_delete=models.CASCADE)
    list_level=models.IntegerField(default=1)
    