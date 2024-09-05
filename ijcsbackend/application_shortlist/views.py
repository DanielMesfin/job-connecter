from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ApplicationShortList
from .serializer import ApplicationShortListSerializer
from application.models import Application
from django.core.mail import send_mail
from smtplib import SMTPException
# Create your views here.
class Add_appTo_shortlist(APIView):
    def post(self,request,app_id,*args, **kwargs):
        try:
            application=Application.objects.get(id=app_id)
            app_shortlist=ApplicationShortList.objects.create(application_id=application)
            
            subject = 'Job Application Status Change'
            message = f'''Congratulations Dear {application.job_seeker.first_name}  your  application for {application.job.title} Position is added to Shortlist'''
            recipient_list = ['asebekalu@gmail.com']
            from_email='asebekalu@gmail.com'
            try:
                send_mail(subject, message, from_email, recipient_list , fail_silently=False)
            except SMTPException as e:
                print(f'An error occurred: {e}')
            print(app_shortlist)
            return Response("app added to shortlist")
        except Exception as e:
            print(e)
            return Response(e)
        
class Remove_from_shortlist(APIView):
    def delete(self,request,app_id,*args, **kwargs):
        try:
            application=Application.objects.get(id=app_id)
            app_shortlist=ApplicationShortList.objects.filter(application_id=application)
            if app_shortlist.exists():
                app_shortlist.delete()
            print(app_shortlist)
            return Response("deleted from shortlist")
        except Exception as e:
            print(e)
            return Response(e)

class ShortlistedApplications(APIView):
    def get(self, request,app_id, *args,**kwargs):
        
        app_in_shortlist=ApplicationShortList.objects.filter(application_id=app_id).exists()
        
        return Response(app_in_shortlist)