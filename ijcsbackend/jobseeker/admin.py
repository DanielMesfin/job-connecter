from django.contrib import admin
from .models import JobSeeker

# Register your models here.
class JobSeekerAdmin(admin.ModelAdmin):
    list_display=("first_name", "last_name", "email", )
admin.site.register(JobSeeker,JobSeekerAdmin)