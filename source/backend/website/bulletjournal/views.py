from django.shortcuts import render
# from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.http import HttpResponseRedirect, JsonResponse
# from django.contrib.auth.models import User
from .forms import LoginForm
from django.contrib.auth.forms import UserCreationForm
from .models import daily, future, monthly
import datetime
import calendar
import json


#View for the signp page
def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            user = authenticate(username=form.cleaned_data.get('username'),
                                password=form.cleaned_data.get('password1'))
            login(request, user)
            return HttpResponseRedirect('app')
    else:
        form = UserCreationForm()
    return render(request, "SignUpPage.html", {'form': form})


#View for the login page
def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data.get('user_name'),
                                password=form.cleaned_data.get('pword'))
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('app')
    else:
        form = LoginForm()
    return render(request, "LoginPage.html", {'form': form})


#Function for fetching daily entries from the database
def send_daily(request):
    if request.method == 'GET' and request.headers['type'] == 'daily':
        dayStr = datetime.date.today().strftime("%Y-%m-%d")
        if daily.objects.filter(user=request.user).count() == 0:
            jsonString = "[{\"date\":\"" + dayStr + "\",\"editable\""\
                         ":true,\"entries\":[{\"type\":\"note\",\"text\""\
                         ":\"A note\",\"subEntries\":[]}]}]"
            newLog = daily(choice_text=jsonString, user=request.user)
            newLog.save()
            return JsonResponse(json.loads(newLog.choice_text), safe=False)
        else:
            entry = daily.objects.all().filter(user=request.user).first()
            if entry.modified_date < datetime.date.today():
                dailystr = "[{\"date\":\"" + dayStr + "\",\"editable\""\
                           ":true,\"entries\":[{\"type\":\"note\",\"text\""\
                           ":\"A note\",\"subEntries\":[]}]}," + entry.choice_text[1:]
                entry.choice_text = dailystr
                entry.save()
            return JsonResponse(json.loads(entry.choice_text), safe=False)


#Function for saving the daily entries into the database
def save_daily(request):
    if request.method == 'POST' and request.headers['type'] == 'daily':
        currDaily = daily.objects.all().filter(user=request.user).first()
        currDaily.choice_text = request.body.decode('utf-8')
        currDaily.save()
        return JsonResponse(json.loads(request.body), safe=False)


#Renderer for the daily log
def daily_view(request):
    return render(request, "index.html")


months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


#Function for fetching the future log entries from the database
def send_future(request):
    if request.method == 'GET' and request.headers['type'] == 'future':
        monthNum = int(datetime.date.today().strftime("%m"))
        if future.objects.filter(user=request.user).count() == 0:
            futurestr = '['
            for i in range(0, 6):
                monthStr = months[(monthNum + i - 1) % 12]
                futurestr += "{\"Month\":\"" + monthStr + "\",\"editable\":true,\"entries\":[{\"type\":\"note\",\"text\":\"A note\",\"subEntries\":[]}]},"
            futurestr = futurestr[:-1]
            futurestr += ']'
            newLog = future(choice_text=futurestr, user=request.user)
            newLog.save()
            return JsonResponse(json.loads(newLog.choice_text), safe=False)
        else:
            monthStr = datetime.date.today().strftime("%m")
            entry = future.objects.all().filter(user=request.user).first()
            if entry.modified_date.month < datetime.date.today().month:
                entry.choice_text = "[{\"Month\":\"" + monthStr + "\",\"editable\":true,\"entries\":[{\"type\":\"note\",\"text\":\"A note\",\"subEntries\":[]}]}," + entry.choice_text[1:]
                entry.save()
            return JsonResponse(json.loads(entry.choice_text), safe=False)


#Function for saving the future log entries into the database
def save_future(request):
    if request.method == 'POST' and request.headers['type'] == 'futureLog':
        currFuture = future.objects.all().filter(user=request.user).first()
        print(request.body.decode('utf-8'))
        currFuture.choice_text = request.body.decode('utf-8')
        currFuture.save()
        return JsonResponse(json.loads(request.body), safe=False)


weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


#Function for fetching the monthly log entries from the database
def send_monthly(request):
    if request.method == 'GET' and request.headers['type'] == 'monthly':
        monthStr = datetime.date.today().strftime("%B")
        if monthly.objects.filter(user=request.user).count() == 0:
            startStr = "[{\"name\":\"" + monthStr + "\",\"entries\":[{\"type\":\"note\",\"text\":\" My Reminders:\",\"subEntries\":[{\"type\":\"note\",\"text\":\" A note\"}]}],\"editable\":\"true\",\"daysOfMonth\":["
            midStr = ""
            now = datetime.datetime.now()
            for i in range(1, calendar.monthrange(now.year, now.month)[1] + 1):
                day = weekDays[datetime.datetime(now.year, now.month, i).weekday()]
                midStr += "{\"dayNum\":\"" + str(i) + "\",\"dayOfWeek\":\"" + day + "\",\"description\":\"\"},"
            midStr = midStr[:-1]
            string = startStr + midStr + "]}]"
            newLog = monthly(choice_text=string, user=request.user)
            newLog.save()
            return JsonResponse(json.loads(newLog.choice_text), safe=False)
        else:
            entry = monthly.objects.all().filter(user=request.user).first()
            if entry.modified_date.month < datetime.date.today().month:
                entry.choice_text = "[{\"Month\":\"" + monthStr + "\",\"editable\":true,\"entries\":[{\"type\":\"note\",\"text\":\"A note\",\"subEntries\":[]}]}," + entry.choice_text[1:]
                entry.save()
            return JsonResponse(json.loads(entry.choice_text), safe=False)


#Function for saving the montly log entries into the database
def save_monthly(request):
    if request.method == 'POST' and request.headers['type'] == 'monthly':
        currMonthly = monthly.objects.all().filter(user=request.user).first()
        currMonthly.choice_text = request.body.decode('utf-8')
        currMonthly.save()
        return JsonResponse(json.loads(request.body), safe=False)


#Stub front page
def front_page(request):
    return render(request, "FrontPage.html")
