from django.forms import ValidationError
from rest_framework import serializers
from .models import *


class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields="__all__"
        # fields = ['full_name','logo','banner','username','email','location','phone' ,'about', 'organizationType', 'industryType','yearOfStablishment','portifolio', 'vision','numberOfEmployees','socialMediaLink','password']
        
        
class UpdateEmployerSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Employer
        fields = ['full_name','username','email','location','phone' ,'about', 'organizationType', 'industryType','yearOfStablishment','portifolio', 'vision','numberOfEmployees','socialMediaLink','password']
        
        
class EmployerSerializerLogin(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = ['email','password']
        
        