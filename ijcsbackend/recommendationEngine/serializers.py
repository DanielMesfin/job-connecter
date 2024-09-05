# jobseeker/serializers.py
from rest_framework import serializers
from .models import JobSeeker

class JobSeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeeker
        fields = '__all__'
