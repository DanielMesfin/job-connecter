import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Message 
from employer.models import Employer
from jobseeker.models import JobSeeker
from application.models import Application
from employer.serializer import EmployerSerializer
from message.serializers import MessageSerializer
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')
        # Handle the message fetching request
        if message_type == 'fetch_messages':
            messages = self.fetch_messages(self.room_name)
            for message in messages:
                self.send(text_data=json.dumps({
                    'message': message,
                    }))
        else:
            #Save the message to the database
            print("messages ",text_data_json['message']['filepath'])
            if text_data_json['message']['filepath']:
                print("from file path")
                filepath=text_data_json['message']['filepath']
                print(text_data_json['message']['filepath'])
                jobseeker_instance = JobSeeker.objects.get(pk=text_data_json['message']['receiver'])
                employer_instance = Employer.objects.get(pk=text_data_json['message']['sender'])
                application_instance=Application.objects.get(pk=1)
                messagesender=text_data_json['message']['messagesender']
                msg=Message.objects.create(
                    employer=employer_instance,
                    jobseeker=application_instance,
                    room=jobseeker_instance, 
                    sender=messagesender,
                    filepath=filepath
                    )    
                message = {'message': MessageSerializer(msg).data}
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type': 'chat_message',
                        'message': message,
                        })
            else:
                
                message_content=text_data_json['message']['message']
                print(text_data_json['message'])
                jobseeker_instance = JobSeeker.objects.get(pk=text_data_json['message']['receiver'])
                employer_instance = Employer.objects.get(pk=text_data_json['message']['sender'])
                application_instance=Application.objects.get(pk=1)
                messagesender=text_data_json['message']['messagesender']
                msg=Message.objects.create(
                    employer=employer_instance,
                    jobseeker=application_instance,
                    room=jobseeker_instance,
                    content=message_content,
                    sender=messagesender,
                    )    
                message = {'message': MessageSerializer(msg).data}
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type': 'chat_message',
                        'message': message,
                        })
    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
      
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
        }))
        # print(f"Sent message to {message} in room {self.room_name}: {message}")
    @staticmethod
    def fetch_messages(room_name):
        messages = Message.objects.filter(room=room_name)
        return [{'message': MessageSerializer(msg).data} for msg in messages]

