from django.http import HttpResponse
from django.shortcuts import render, redirect
# from django.contrib.auth import login as auth_login
from django.contrib.auth import authenticate
from .models import Task

from .forms import SignUpForm

def index(request):
    tasks=Task.objects.all()
    return render(request, 'todo_list/index.html', {'tasks':tasks})

def signup(request):
    if request.method == 'POST':
        form=SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username=form.cleaned_data.get('username')
            raw_password=form.cleaned_data.get('password1')
            user=authenticate(username=username, password=raw_password)
            # auth_login(request, user)
            return redirect('login')
    else:
        form=SignUpForm()
    return render(request, 'todo_list/signup.html', {'form':form})