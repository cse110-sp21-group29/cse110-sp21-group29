# from django.contrib import admin
# from django.contrib.auth import login
from django.urls import path

# importing views from views.py
from .views import (signup_view, login_view, front_page, daily_view,
                    send_daily, save_daily, send_future, save_future,
                    send_monthly, save_monthly)

urlpatterns = [
    path('', signup_view, name='signup'),
    path('login', login_view, name='login'),
    path('front_page/', front_page, name='front'),
    path('app/', daily_view, name='daily'),
    path('app/sendDaily/', send_daily, name='send_daily'),
    path('app/receiveDaily/', save_daily, name='save_daily'),
    path('app/sendFuture/', send_future, name='send_future'),
    path('app/receiveFuture/', save_future, name='save_future'),
    path('app/sendMonthly/', send_monthly, name='send_monthly'),
    path('app/receiveMonthly/', save_monthly, name='save_monthly')
]
