from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):
    email=forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2',)

class LogInForm(AuthenticationForm):
    username=forms.CharField(max_length=254, widget=forms.TextInput(attrs={'placeholder':'Username'}))
    password = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))

    # class Meta:
    #     model=User
    #     fields=('username', 'password')