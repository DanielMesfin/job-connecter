from django.contrib import admin

from .models import Job

# Register your models here.

class JobAdmin(admin.ModelAdmin):
    list_display=(
        'employer',
        'title',
        'vacancies',
        'job_type',
        'job_category',
        'post_date',
        'deadline',
        )
    list_display_links=(
        'employer',
        'title',
        'post_date',
        'deadline',
    )
    readonly_fields=(
         'post_date',
        'deadline',
    )


admin.site.register(Job,JobAdmin)