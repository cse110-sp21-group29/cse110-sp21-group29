from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import EmailForm
# Create your views here.
def login_view(request):
    if request.method == 'POST':
        form = EmailForm(request.POST)
        if form.is_valid():
            return HttpResponseRedirect('')
    else:
        form = EmailForm()
    return render(request, "LoginPage.html", {'form': form})

def front_page(request):
    return render(request, "FrontPage.html")