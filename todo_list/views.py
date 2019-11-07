from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from .models import Task

def index(request):
    tasks=Task.objects.all()
    return render(request, 'todo_list/index.html', {'tasks':tasks})

def login(request):
    return render(request, 'todo_list/login.html', {})

def signup(request):
    if request.method == 'POST':
        form=UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username=form.cleaned_data.get('username')
            raw_password=form.cleaned_data.get('password1')
            user=authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form=UserCreationForm()
    return render(request, 'todo_list/signup.html',{'form':form})