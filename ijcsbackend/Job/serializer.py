from rest_framework import serializers
from .models import *

class JobSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Job
        # fields="__all__"
        fields = ['title','post_date','tag','education','job_level','job_role','vacancies','req_experience','job_type','job_category','deadline','location','job_benefits','job_description','salary','responsiblity','required_skill']

        # fields = ['title','post_date','tag','education','is_favorite','job_level','job_role','vacancies','req_experience','job_type','job_category','deadline','location','job_benefits','job_description','salary','responsiblity','required_skill']
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.pk:  # Check if the instance has been saved (i.e., it's not a new job)
            data['id']=instance.id
            data['status'] = instance.status  # Add status field to the serialized data
        return data
    #    fields="__all__"
        
        