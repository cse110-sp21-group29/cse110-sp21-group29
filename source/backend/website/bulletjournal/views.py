from django.shortcuts import render
# from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.http import HttpResponseRedirect
# from django.contrib.auth.models import User
from .forms import LoginForm
from django.contrib.auth.forms import UserCreationForm


# Create your views here.
def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            user = authenticate(username=form.cleaned_data.get('username'),
            password=form.cleaned_data.get('password1'))
            login(request, user)
            return HttpResponseRedirect('front_page')
    else:
        form = UserCreationForm()
    return render(request, "SignUpPage.html", {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data.get('user_name'),
            password=form.cleaned_data.get('pword'))
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('front_page')
    else:
        form = LoginForm()
    return render(request, "LoginPage.html", {'form': form})


def front_page(request):
    return render(request, "FrontPage.html")
    