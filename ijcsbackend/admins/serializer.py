from django.forms import ValidationError
from rest_framework import serializers
from .models import *


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrator
        fields = ['full_name','profile_picture','email','phone', 'access_level','password']
class UpdateAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrator
        fields = ['full_name','email','phone', 'access_level','password']
        
     