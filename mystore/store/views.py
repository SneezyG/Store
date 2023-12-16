from django.shortcuts import render
from django.views import View
from django.core.exceptions import PermissionDenied
from models import Return
from django.http import JsonResponse
import json




def Test(request):
  
   """
   return the store-app index page with a link to the login interface.
   """
  
   return render(request, 'panel.html')




def Index(request):
  
   """
   return the store-app index page with a link to the login interface.
   """
  
   return render(request, 'index.html')




def Panel(request):
  
  """
  Check if user is logged in and then return the panel page. Every user can access this page.
  """
  
  return render(request, 'panel.html')
  



def Report(request):
  
   """
   return the store-app report page, Only manager(supervisor) can access this page.
   """
   
   user_type = request.user.user_type
  
   if user_type == "manager":
     return render(request, 'report.html')
   raise PermissionDenied




  
class Update(View):
  
  """
  This return the update page on get request and update the item-table in the store database on post request.
  This view also check if the user is logged in and have the necessary permission to use this logic
  Only supervisor and manager(superuser) can access this page.
  """
  
  template = 'update.html'
  
  def dispatch(self, request, *args, **kwargs):
    user_type = request.user.user_type
    if user_type == "manager" or user_type == "supervisor":
      return super().dispatch(request, *args, **kwargs)
    raise PermissionDenied
  
  def get(self, request, *args, **kwargs):
    return render(request, self.template)
    
    
  def post(self, request, *args, **kwargs):
    pass


  
class Return(View):
  
  """
  This return the return page on get request and update the returns-table in the store database on post request.
  This view also check if the user is logged in and have the necessary permission to use this logic.
  Only supervisor and manager(superuser) can access this page.
  """
  
  template = 'return.html'
  
  def dispatch(self, request, *args, **kwargs):
    user_type = request.user.user_type
    if user_type == "manager" or user_type == "supervisor":
      return super().dispatch(request, *args, **kwargs)
    raise PermissionDenied
  
  def get(self, request, *args, **kwargs):
    returns = Return.objects.count()
    return render(request, self.template, {returns: returns,})
    
    
  def post(self, request, *args, **kwargs):
    data = json.loads(request.body.decode('utf-8'))
    
    try:
      item = Item.objects.get(serial_no=data.item_id)
    except Item.DoesNotExist:
      return JsonResponse({'error': 'invalid serial number'}, status=400)
      
    Return.objects.create()
    return JsonResponse({'success': 'new return submitted successfully'})



def Welcome(request):
  
   """
   return the welcome page with a link to the store  panel.
   """
   template = "welcome.html"
   return render(request, template)