from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from .models import Task
from .forms import SignUpForm

def index(request):
    tasks=Task.objects.filter(created_by=request.user.id)
    qty=Task.objects.filter(created_by=request.user.id).count()
    return render(request, 'todo_list/home.html', {'tasks':tasks, 'qty':qty})

def signup(request):
    if request.method == 'POST':
        form=SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username=form.cleaned_data.get('username')
            raw_password=form.cleaned_data.get('password1')
            user=authenticate(username=username, password=raw_password)
            group=Group.objects.get(name='normal_user')
            group.user_set.add(user)
            # auth_login(request, user)
            return redirect('login')
    else:
        form=SignUpForm()
    return render(request, 'todo_list/signup.html', {'form':form})

