from rest_framework import serializers
from .models import *

class JobIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model= JobIssue
        fields = ['id', 'job', 'issue']