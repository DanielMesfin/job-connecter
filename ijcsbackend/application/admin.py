from django.contrib import admin

from application.models import Application

# Register your models here.
class ApplicationAdmin(admin.ModelAdmin):
    list_display=["company","job_title","job_seeker","resume"]
admin.site.register(Application,ApplicationAdmin)