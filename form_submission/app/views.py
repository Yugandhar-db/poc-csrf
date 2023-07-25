from django.shortcuts import render
from .forms import CustomerForm
from django.utils.decorators import method_decorator
from django.http import HttpResponse
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

# @ensure_csrf_cookie
# @csrf_exempt
@csrf_protect
def index(request):

	form = CustomerForm()

	if request.method == 'POST':
		print("Headers===>",request.headers.__dict__)
		form = CustomerForm(request.POST)
		if form.is_valid():
			form.save()
			
	context = {'form':form}
	return render(request, 'app/index.html', context)

@ensure_csrf_cookie
def get_csrf_token():
	return HttpResponse('Hey you got the Token here...!')