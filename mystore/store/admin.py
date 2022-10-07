

from django.contrib import admin
from django.contrib.admin.models import LogEntry,DELETION
from django.utils.html import escape
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Item, Sale, Transaction
from .form import ItemAdminForm, SaleAdminForm


# admin interface customization
admin.site.empty_value_display = '(None)'
admin.site.list_per_page = 50
admin.site.site_header = 'MY STORE'
admin.site.index_title = " My Store Management"
admin.site.site_title = "Store Admin"



@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    
    """
    Register the django log table into the admin.
    Add some customization and also define user access permission.
    """
    
    date_hierarchy = 'action_time'

    list_filter = [
        'user',
        'content_type',
        'action_flag'
    ]


    search_fields = [
        'object_repr',
        'change_message'
    ]

    list_display = [
        'action_time',
        'user',
        'content_type',
        'action_flag',
    ]
    
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser

    


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
  
  """
    Register the item model into the admin.
    Add some customization.
    Define stock method that return the amount left for an item object
  """
  
  form = ItemAdminForm
  fieldsets = (
    (None, {
      'classes': ('extrapretty'),
      'fields': ('serial_no', 'name')
    }),
    
    ('Details', {
      'classes': ('extrapretty'),
      'fields': ('mugshot', 'category', 'sub_catg', 'description', 'price', 'quantity', 'sold')
    }),
    )
    
  list_display = ('serial_no', 'name', 'category_subcategory', 'cost_price', 'selling_price', 'stock', 'sold', 'description')
  

  search_fields = ('name', 'category', 'sub_category', 'description')
  
      
  def category_subcategory(self, obj):
     "return the category and sub_category as a string"
     verbose_name= ' category & subcategory '
     return " %s | %s " % (obj.category, obj.sub_category)
     
  category_subcategory.short_description = 'category | subcategory'
     
  def stock(self, obj):
     "return amount left for an item object"
     if obj.sold:
       return obj.quantity - obj.sold
     else:
       return obj.quantity
       



@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
  
  """
    Register the sale model into the admin.
    Add some customisation.
    
  """
  
  form = SaleAdminForm
  exclude = ('serial_no',)

  date_hierarchy = 'date'
  
  list_display = ('serial_no', 'name', 'category_subcategory', 'transaction', 'price', 'sold', 'size', 'color', 'date' )
  
  list_filter = ('date',)
 
  search_fields = ('name', 'description', 'transaction__serial_no')
  
  def category_subcategory(self, obj):
     "return the category and sub_category as a string"
     verbose_name= ' category & subcategory '
     return " %s | %s " % (obj.category, obj.sub_catg)
     
  category_subcategory.short_description = 'category | subcategory'
 
 
  
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
  
  """
    Register the Transaction model into the admin.
    Add some customisation.
  """
  
  date_hierarchy = 'date'

  list_display = ('buyer', "attendant", "date")
  
  list_filter = ('date',)
 
  search_fields = ('buyer', 'seller')