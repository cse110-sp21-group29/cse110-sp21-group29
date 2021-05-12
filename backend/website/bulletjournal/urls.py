from django.contrib import admin
from django.urls import path
  
# importing views from views..py
from .views import login_view, front_page
  
urlpatterns = [
    path('', login_view),
    path('your-email/', front_page),
]