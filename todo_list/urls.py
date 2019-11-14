from django.urls import path
from . import views
from .forms import LogInForm
from django.contrib.auth.views import LoginView, PasswordResetView

urlpatterns=[
    path('', views.index, name='index'),
    path('signup', views.signup, name='signup'),
    path('login/', LoginView.as_view(template_name='registration/login.html', authentication_form=LogInForm), name='login'),
    path('password_reset/', PasswordResetView.as_view(template_name='todo_list/password_reset_form.html'), name='password_reset'),
]