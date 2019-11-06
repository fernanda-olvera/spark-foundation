from django.http import HttpResponse
from django.shortcuts import render
from .models import Task

def index(request):
    tasks=Task.objects.all()
    return render(request, 'todo_list/index.html', {'tasks':tasks})