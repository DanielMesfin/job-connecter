from django.core.mail import send_mail
from django.conf import settings
import secrets
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from employer.models import Employer
from jobseeker.models import JobSeeker
class Validation:
    
    def is_user_fully_filled(user_id,model):
        try:
            # Get the user instance
            user = model.objects.get(pk=user_id)
            
            # Check if all attributes of the user instance are fully filled
            for field in user._meta.fields:
                value = getattr(user, field.attname)
                if value is None or (isinstance(value, str) and value.strip() == ''):
                    return False
            
            # All attributes are fully filled
            return True
        
        except model.DoesNotExist:
            # Handle the case where the user with the given ID doesn't exist
            return False

    def generate_token():
        # Generate a random token using the 'secrets' module
        token = secrets.token_urlsafe(32)
        return token

    def send_verification_email(email,token):
        verification_link = "http://localhost:5173/verify?email="+email+"&token="+token
        subject = 'Email Verification'
        message = f'Please click the following link to verify your email: {verification_link}'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)
    
    # def verify_email(self,request):
    #     # Retrieve the user's account based on the verification token
    #     print("from verify email")
        
    #     job_seeker = get_object_or_404(job_seeker, verification_token=verification_token)
    #     employer = get_object_or_404(employer, verification_token=verification_token)

    #     # Update the necessary fields to mark the email as verified
    #     if job_seeker: 
    #         job_seeker.email_verified = True
    #         job_seeker.save()
    #         return JsonResponse({"message": "Email verification successful"})
    #     elif employer:
    #         employer.email_verified = True
    #         employer.save()
    #         return JsonResponse({"message": "Email verification successful"})
    #     else:
    #         return JsonResponse({"message": "Email verification successful"})
        
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
