from django.shortcuts import render
# from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.http import HttpResponseRedirect, JsonResponse
# from django.contrib.auth.models import User
from .forms import LoginForm
from django.contrib.auth.forms import UserCreationForm
from .models import daily
import datetime
import json

# Create your views here.
def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            user = authenticate(username=form.cleaned_data.get('username'),
                                password=form.cleaned_data.get('password1'))
            login(request, user)
            return HttpResponseRedirect('daily')
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
                return HttpResponseRedirect('daily')
    else:
        form = LoginForm()
    return render(request, "LoginPage.html", {'form': form})

def send_daily(request):
    if request.method == 'GET':
        dayStr = datetime.date.today().strftime("%Y-%m-%d")
        if daily.objects.filter(user=request.user).count() == 0:
            jsonString = "[{\"date\":\"" + dayStr + "\",\"editable\":true,\"entries\":[{\"type\":\"note\",\"text\":\"A note\",\"subEntries\":[]}]}]"
            newLog = daily(choice_text = jsonString, user = request.user)
            newLog.save()
            return JsonResponse(json.loads(newLog.choice_text), safe=False)
        else:
            entry = daily.objects.all().filter(user=request.user).first()
            if entry.modified_date < datetime.date.today():
                entry.choice_text =  "[{\"date\":\"" + dayStr + "\",\"editable\":true,\"entries\":[{\"type\":\"note\",\"text\":\"A note\",\"subEntries\":[]}]}," + entry.choice_text[1:]
                entry.save()
            return JsonResponse(json.loads(entry.choice_text), safe=False)

def save_daily(request):
    if request.method == 'POST':
        currDaily = daily.objects.all().filter(user=request.user).first()
        currDaily.choice_text = request.body.decode('utf-8')
        currDaily.save()
        return JsonResponse(json.loads(request.body), safe=False)

def daily_view(request):
    return render(request, "frontend/app/index.html")


def front_page(request):
    return render(request, "FrontPage.html")
