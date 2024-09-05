from rest_framework import serializers
from .models import *


class JobSeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model= JobSeeker
        fields='__all__'



class JobSeekerSerializer4ApplicantDetail(serializers.ModelSerializer):
    class Meta:
        model=JobSeeker
        fields=[ 'email', 'profile_picture',  'experience', 'first_name', 'last_name',  'phone',  'location', 'socialMediaLink', 'birth_date','bio','gender','nationality','portfolio','skills','educations']
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data
