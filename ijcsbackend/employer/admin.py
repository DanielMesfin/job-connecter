from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from employer.models import Employer

# Register your models here.
class AccountAdmin(admin.ModelAdmin):
    #attributes to be displayed on users account table
    list_display=('logo_tag','full_name','email', 'last_login','date_joined')
    ordering=('date_joined',)
    #making the attribute clickable
    list_display_links=('logo_tag','email','full_name')
    #making the attributes not to be editied
    readonly_fields=('last_login','date_joined')
    filter_horizontal=()
    list_filter=()
    fieldsets=()
admin.site.register(Employer,AccountAdmin)
 