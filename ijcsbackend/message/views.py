# messaging/views.py
from django.shortcuts import render

def chat_view(request, username):
    return render(request, 'messaging/chat.html', {'receiver_username': username})
# messaging/views.py
from django.shortcuts import render,HttpResponse

def chat_view(request, username):
    return HttpResponse("Hello "+username)
    #return render(request, 'messaging/chat.html', {'receiver_username': username})
