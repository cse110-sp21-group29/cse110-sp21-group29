from django.db import models
from django.conf import settings
# Create your models here.


class daily(models.Model):
    choice_text = models.CharField(max_length=1000)
    modified_date = models.DateField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, null=True, unique=True)


class future(models.Model):
    choice_text = models.CharField(max_length=1000)
    modified_date = models.DateField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, null=True, unique=True)


class monthly(models.Model):
    choice_text = models.CharField(max_length=1000)
    modified_date = models.DateField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, null=True, unique=True)
