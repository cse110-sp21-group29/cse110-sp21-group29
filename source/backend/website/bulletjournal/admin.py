from django.contrib import admin

# Register your models here.
from .models import daily, future, monthly
admin.site.register(daily)
admin.site.register(future)
admin.site.register(monthly)
