from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection

# Create your views here.


def index(request):
   try:
     
      with connection.cursor() as cursor:
        cursor.execute("SELECT logo FROM admin_interface_theme")
        path = cursor.fetchone()
        path = path[0]
        print(path)

   except:
      path = 0
  
  
   return render(request, 'index.html', {"logo": path})


def panel(request):
  return render(request, 'panel.html')

