from django.contrib import admin
from .models import  Message

class MessageAdmin(admin.ModelAdmin):
    list_display=('employer','jobseeker','room','content','haveseen','timestamp')
        

admin.site.register(Message, MessageAdmin)
