# from django.contrib import admin
# from django.contrib.auth import login
from django.urls import path

# importing views from views.py
from .views import *

urlpatterns = [
    path('', signup_view, name='signup'),
    path('login', login_view, name='login'),
    path('front_page/', front_page, name='front'),
    path('daily/', daily_view, name='daily'),
    path('daily/sendDaily/', send_daily, name='send_daily'),
    path('daily/receiveDaily/', save_daily, name='save_daily'),
    path('daily/sendFuture/', send_future, name='send_future'),
    path('daily/receiveFuture/', save_future, name='save_future')
]
