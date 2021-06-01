# from django.contrib import admin
# from django.contrib.auth import login
from django.urls import path

# importing views from views.py
from .views import signup_view, login_view, front_page, daily_view

urlpatterns = [
    path('', signup_view, name='signup'),
    path('login', login_view, name='login'),
    path('front_page/', front_page, name='front'),
    path('daily/', daily_view, name='daily'),
]
