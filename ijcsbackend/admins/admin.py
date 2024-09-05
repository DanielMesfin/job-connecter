from django.contrib import admin
from .models import *
# Register your models here.
class AccountAdmin(admin.ModelAdmin):
    #attributes to be displayed on users account table
    list_display=('profile_picture_tag','full_name','email', 'access_level','date_joined')
    ordering=('date_joined',)
    #making the attribute clickable
    list_display_links=('profile_picture_tag','email','full_name')
    #making the attributes not to be editied
    readonly_fields=('last_login','date_joined')
    filter_horizontal=()
    list_filter=()
    fieldsets=()
admin.site.register(Administrator,AccountAdmin)