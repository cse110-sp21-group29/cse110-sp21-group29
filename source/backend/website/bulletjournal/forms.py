from django import forms

class LoginForm(forms.Form):
    user_name = forms.CharField(label='Username', max_length=100)
    pword = forms.CharField(label='Password', max_length=100)

class SignUpForm(forms.Form):
    user_name = forms.CharField(label='Username', max_length=100)
    pword = forms.CharField(label='Password', max_length=100)