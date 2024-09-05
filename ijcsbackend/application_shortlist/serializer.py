from rest_framework import serializers
from .models import ApplicationShortList

class ApplicationShortListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationShortList
        fields = '__all__'