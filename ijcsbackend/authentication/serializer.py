from rest_framework import serializers
from .models import Authentication

class PwdResetSerializer(serializers.ModelSerializer):
    class Meta:
        model=Authentication
        fields=['otp','email','timeStamp']