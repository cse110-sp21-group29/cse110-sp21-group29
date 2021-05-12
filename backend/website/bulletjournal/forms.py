from django import forms

class EmailForm(forms.Form):
    your_name = forms.CharField(label='Your Email', max_length=100)