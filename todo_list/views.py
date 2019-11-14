from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from .models import Task
from .forms import SignUpForm

def index(request):
    tasks=Task.objects.filter(created_by=request.user.id)
    qty=Task.objects.filter(created_by=request.user.id).count()

    if request.POST:

        name=request.POST.get('name')
        new_name=request.POST.get('new_name')
        checked=request.POST.get('completed')
        completed=True if checked=='true' else False

        if request.POST.get('action') == 'editN':
            tasks.filter(name=name).update(name=new_name)
        
        elif request.POST.get('action') == 'addTask':
            t=Task(created_by=request.user,name=name,completed=False)
            t.save()

        elif request.POST.get('action') == 'editC':        
            tasks.filter(name=name).update(completed=completed)

        elif request.POST.get('action') == 'deleteTask':
            tasks.filter(name=name).delete()

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