from django.urls import path
from . import views
from .forms import LogInForm
from django.contrib.auth.views import LoginView

urlpatterns=[
    path('', views.index, name='index'),
    path('edit_task', views.edit_task, name='edit_task'),
    path('delete_task', views.delete_task, name='delete_task'),
    path('signup', views.signup, name='signup'),
    path('login/', LoginView.as_view(template_name='registration/login.html', authentication_form=LogInForm), name='login'),
]