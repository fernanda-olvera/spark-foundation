from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from .models import Task
from .forms import SignUpForm

def index(request):
    tasks=Task.objects.filter(created_by=request.user.id)
    qty=Task.objects.filter(created_by=request.user.id).count()
    response_data={}

    if request.POST.get('action') == 'post':
        or_name=request.POST.get('original_name')
        new_name=request.POST.get('name')
        checked=request.POST.get('completed')
        completed=True if checked=='true' else False
        
        response_data['name']=new_name
        response_data['completed']=completed

        t=tasks.get(name=or_name)
        t.name=new_name
        t.completed=completed
        t.save()
        return JsonResponse(response_data)

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

def add_task(request):
    tasks=Task.objects.filter(created_by=request.user.id)
    qty=Task.objects.filter(created_by=request.user.id).count()
    response_data={}

    if request.POST.get('action') == 'post':
        name=request.POST.get('name')
        
        response_data['name']=name

        t=Task(created_by=request.user,name=name,completed=False)
        t.save()
        return JsonResponse(response_data)

    return render(request, 'todo_list/home.html', {'tasks':tasks, 'qty':qty})

def edit_task(request):
    tasks=Task.objects.filter(created_by=request.user.id)
    qty=Task.objects.filter(created_by=request.user.id).count()
    response_data={}

    if request.POST.get('action') == 'post':
        name=request.POST.get('name')
        checked=request.POST.get('completed')
        completed=True if checked=='true' else False
        
        response_data['name']=name
        response_data['completed']=completed

        tasks.filter(name=name).update(completed=completed)
        return JsonResponse(response_data)

    return render(request, 'todo_list/home.html', {'tasks':tasks, 'qty':qty})

def delete_task(request):
    tasks=Task.objects.filter(created_by=request.user.id)
    qty=Task.objects.filter(created_by=request.user.id).count()
    response_data={}

    if request.POST.get('action') == 'post':
        name=request.POST.get('name')
        
        response_data['name']=name

        tasks.filter(name=name).delete()
        return JsonResponse(response_data)

    return render(request, 'todo_list/home.html', {'tasks':tasks, 'qty':qty})
