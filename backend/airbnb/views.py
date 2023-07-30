from django.shortcuts import render, HttpResponse

# from rest_framework import viewsets
# from .serializers import TodoSerializer
# from .models import Todo

# Create your views here.

# class TodoView(viewsets.ModelViewSet):
#     serializer_class = TodoSerializer
#     queryset = Todo.objects.all()

def Index(requst):
    return HttpResponse("It is working")