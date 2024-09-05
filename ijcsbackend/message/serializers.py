from rest_framework import serializers
from employer.serializer import EmployerSerializer
from jobseeker.serializers import JobSeekerSerializer
from application.serializers import ApplicationSerializer
from message.models import Message

class MessageSerializer(serializers.ModelSerializer):
    employer = EmployerSerializer()
    jobseeker = ApplicationSerializer()
    room =  JobSeekerSerializer()

    class Meta:
        model = Message
        fields = ['employer', 'jobseeker', 'room', 'content', 'timestamp', 'haveseen','sender','filepath']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['timestamp'] = instance.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        return data