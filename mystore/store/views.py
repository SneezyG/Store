from django.shortcuts import render
from django.views import View



def Index(request):
  
   """
   return the store-app index page with a link to the login interface.
   """
  
   return render(request, 'index.html')




def Panel(request):
  
  """
  Check if user is logged in and then return the panel page.
  """
  
  return render(request, 'panel.html')
  



def Report(request):
  
   """
   return the store-app report page.
   """
   
   return render(request, 'report.html')




  
class Update(View):
  
  """
  This return the update page on get request and update the item-table in the store database on post request.
  This view also check if the user is logged in and have the necessary permission to use this logic.
  """
  
  template = 'update.html'
  
  def get(self, request, *args, **kwargs):
    return render(request, self.template) 
    
    
  def post(self, request, *args, **kwargs):
    pass


  
class Return(View):
  
  """
  This return the return page on get request and update the returns-table in the store database on post request.
  This view also check if the user is logged in and have the necessary permission to use this logic.
  """
  
  template = 'return.html'
  
  def get(self, request, *args, **kwargs):
    return render(request, self.template) 
    
    
  def post(self, request, *args, **kwargs):
    pass



def Error(request):
  template = "404.html"
  return render(request, template)


