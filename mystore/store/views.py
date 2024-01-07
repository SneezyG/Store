from django.shortcuts import render
from django.views import View
from django.core.exceptions import PermissionDenied
from .models import Item, Returns, Transaction, Sale
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
import pandas as pd
from django.db import transaction
from django.db.models import Sum, CharField, FloatField
from django.utils import timezone
from django.db.models.functions import Cast






def Index(request):
  
   """
   return the store-app index page with a link to the login interface.
   """
  
   return render(request, 'index.html')







def Panel(request):
  
  """
  Check if user is logged in and then return the panel page. Every user can access this view.
  """
  
  return render(request, 'panel.html')
  







@require_http_methods(["POST",])
def GetItem(request):
  """
  return a json object of an item given it's serial_no
  """
  data = json.loads(request.body.decode('utf-8'))
  
  try:
    item = Item.objects.get(serial_no=data['serial_no'])
  except Item.DoesNotExist:
    return JsonResponse({'error': 'invalid serial number'}, status=400)
    
  available = item.quantity - item.sold
  if available <= 0:
    stock_info = "out of stock"
  else:
    stock_info = "in of stock"
  
  mugshot = ''
  if item.mugshot:
    mugshot = item.mugshot.url
    
  return JsonResponse({
    'success': stock_info,
    'item': {
      'id': item.serial_no,
      'available': available,
      'name': item.name,
      'category': item.category,
      'size': item.size,
      'price': item.selling_price,
      'mugshot': mugshot,
      'description': item.description,
    }
  })
  
  
  
  
  
  
  
  
@require_http_methods(["POST",])
def ProcessTransaction(request):
  """
  return a transaction_id after processing sales.
  """
  data = json.loads(request.body.decode('utf-8'))
  
  sales_arr = []
  item_arr = []
  
  for sold_item in data:
    try:
      item = Item.objects.get(serial_no=sold_item['id'])
    except Item.DoesNotExist:
      return JsonResponse({'error': 'invalid serial number'}, status=400)
      
    stock = item.quantity - item.sold
    if int(sold_item['quantity']) > stock:
      return JsonResponse({'error': 'item is out of stock'}, status=400)
    
    profit = (int(item.quantity) * float(item.selling_price)) - (int(item.quantity) * float(item.cost_price))
    
    sale = Sale(serial_no=item.serial_no, name=item.name, category=item.category, sub_catg=item.sub_catg, sold=sold_item['quantity'], cost_price=item.cost_price, selling_price=item.selling_price, total_profit=profit)
    
    item.sold += int(sold_item['quantity'])
    sales_arr.append(sale)
    item_arr.append(item)
    
  transact = Transaction.objects.create(attendant=request.user.username)
  
  for sales in sales_arr:
    sales.transaction = transact
    sales.save()
    
  for item in item_arr:
    item.save()
    
  return JsonResponse({
    'success': 'transaction successful',
    'transaction_id': transact.id
  })
  
  
      
  
    
  
  



def Report(request):
  
   """
   return the store-app report page, Only manager(supervisor) can access this view.
   """
   
   user_type = request.user.user_type
  
   if user_type == "manager":
      current_date = Sale.objects.latest('date_test').date_test

      # query sales data
      sales = Sale.objects.filter(date_test__gte=current_date - timezone.timedelta(weeks=16))
      sales = sales.order_by('-date_test')
      sales = sales.values('date_test').annotate(sold=Sum('sold'), aggr_profit=Sum('total_profit'))
      sales = sales.annotate(date_string=Cast('date_test', CharField()))
      sales = sales.annotate(profit=Cast('aggr_profit', FloatField()))
      
      # sold data
      sold = list(sales.values('date_string', 'sold'))
      
      # profit data
      profit = list(sales.values('date_string', 'profit'))
      
      salesObj = {
        'sold_data': sold,
        'profit_data': profit,
        'sale_summary': {
          'week_1': sale_summary(Sale.objects.filter(date_test__gte=current_date - timezone.timedelta(weeks=1))),
          'week_2': sale_summary(Sale.objects.filter(date_test__gte=current_date - timezone.timedelta(weeks=2))),
          'week_4': sale_summary(Sale.objects.filter(date_test__gte=current_date - timezone.timedelta(weeks=4))),
          'week_8': sale_summary(Sale.objects.filter(date_test__gte=current_date - timezone.timedelta(weeks=8))),
          'week_16': sale_summary(Sale.objects.filter(date_test__gte=current_date - timezone.timedelta(weeks=16))),
        }
      }
      
      return render(request, 'report.html', salesObj)
      
   raise PermissionDenied

 
  
def sale_summary(sales):
  return {
    'total_sales': sales.aggregate(Sum('sold'))['sold__sum'],
    'gross_profit': float(sales.aggregate(Sum('total_profit'))['total_profit__sum']),
    'most_sold_item': most_sold_dimension(sales.values('name').annotate(sold=Sum('sold')), 'name'),
    'most_sold_category': most_sold_dimension(sales.values('category').annotate(sold=Sum('sold')), 'category'),
    'most_sold_day': most_sold_dimension(sales.values('date_test').annotate(sold=Sum('sold')), 'date_test').strftime('%A'),
  };



def most_sold_dimension(sales, dimension):
  max_dimension = None
  most_sold = 0
  
  for sale in sales:
    if sale['sold'] > most_sold:
      most_sold = sale['sold']
      max_dimension = sale[dimension]
      
  return max_dimension
    
  
  
  




  
  
  
  
  
  
  
class Update(View):
  
  """
  This return the update page on get request and update the item-table in the store database on post request.
  Only supervisor and manager(superuser) can access this view.
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
    file = request.FILES['items_file']
    
    try:
        # Check if the file is a CSV or Excel file
        if file.name.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.name.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file)
        else:
            return JsonResponse({'error': 'unsuppored file format'}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'error reading file'}, status=400)
        
    items = df.iloc[0 : 8]
    index = 0
    
    try:
      with transaction.atomic():
         for index, row in items.iterrows():
            newItem= Item(serial_no=row["barcode"], name=row["name"], category=row["category"], color=row["color"], size=row["size"], description=row["description"], quantity=row["quantity"], cost_price=row["cost-price"], selling_price=row["selling-price"], sold=row["sold"])
            newItem.save()
    except Exception as e:
      #print(e)
      index += 1
      error = 'file-error: error on line %s' % index
      return JsonResponse({'error': error}, status=400)
      
    return JsonResponse({'success': 'items added to database'})
  
       
    







  
class Return(View):
  
  """
  This return the return page on get request and update the returns-table in the store database on post request.
  Only supervisor and manager(superuser) can access this view.
  """
  
  template = 'return.html'
  
  def dispatch(self, request, *args, **kwargs):
    user_type = request.user.user_type
    if user_type == "manager" or user_type == "supervisor":
      return super().dispatch(request, *args, **kwargs)
    raise PermissionDenied
  
  def get(self, request, *args, **kwargs):
    quantity = 0
    
    returned_items = Returns.objects.all()
    for item in returned_items:
      quantity += item.quantity
      
    return render(request, self.template, {'returns': quantity,})
    
    
  def post(self, request, *args, **kwargs):
    data = json.loads(request.body.decode('utf-8'))
    
    try:
      item = Item.objects.get(serial_no=data['item_id'])
    except Item.DoesNotExist:
      return JsonResponse({'error': 'invalid serial number'}, status=400)
      
    returns = Returns.objects.create(quantity=data['no_returned'])
    returns.item = item
    returns.save()
    return JsonResponse({'success': 'new return submitted successfully'})









def Welcome(request):
  
   """
   return the welcome page with a link to the store  panel.
   """
   template = "welcome.html"
   return render(request, template)