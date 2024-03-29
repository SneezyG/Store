
from django.contrib import admin
from django.contrib.admin.models import LogEntry
from .models import User, Item, Sale, Transaction, Returns
from django.contrib.auth.admin import UserAdmin


# admin interface customization
admin.site.empty_value_display = '(None)'
admin.site.list_per_page = 50
admin.site.site_header = 'MY STORE'
admin.site.index_title = "My Store Management"
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
        return False

    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser




@admin.register(User)
class UserEntryAdmin(UserAdmin):
  
    """
    Register the User table into the admin.
    Add some customization.
    """
    
    date_hierarchy = 'date_joined'
    
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'user_type', 'groups', 'user_permissions', 'is_staff', 'is_superuser')}),
        )
    
    list_display = ('username', 'email', 'last_login', 'is_active', 'is_staff', 'is_superuser', 'user_type', 'date_joined')
    
    list_filter = ('is_staff', 'is_active', 'is_superuser', 'user_type', 'date_joined')
    
    preserve_filters = False

    search_fields = ('username',)
    
    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

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

  fieldsets = (
    (None, {
      'classes': ('extrapretty'),
      'fields': ('serial_no', 'name', 'cost_price', 'selling_price')
    }),
    
    ('Details', {
      'classes': ('extrapretty'),
      'fields': ('mugshot', 'category', 'sub_catg', 'description', 'size', 'color', 'quantity')
    }),
    )
    
  list_display = ('serial_no', 'name', 'category_subcategory', 'cost_price', 'selling_price', 'stock', 'sold', 'date', 'description')
  

  search_fields = ('serial_no',)
  
      
  def category_subcategory(self, obj):
     "return the category and sub_category as a string"
     return " %s | %s " % (obj.category, obj.sub_catg)
     
  category_subcategory.short_description = 'category | subcategory'
     
  def stock(self, obj):
     "return amount left for an item object"
     stock = obj.quantity
       
     if obj.sold:
       stock = stock - obj.sold
     
     return stock
       



@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
  
  """
    Register the sale model into the admin.
    Add some customisation.
    
  """

  date_hierarchy = 'date_test'
  
  list_display = ('serial_no', 'name', 'category_subcategory', 'sold', 'total_profit', 'cost_price', 'selling_price', 'date_test' )
  
  list_filter = ('date_test',)
 
  search_fields = ('transaction__id',)
  
  def category_subcategory(self, obj):
     "return the category and sub_category as a string"
     verbose_name= ' category & subcategory '
     return " %s | %s " % (obj.category, obj.sub_catg)
     
  category_subcategory.short_description = 'category | subcategory'



  def has_add_permission(self, request):
        return False

  def has_change_permission(self, request, obj=None):
        return False

  def has_delete_permission(self, request, obj=None):
        return False

  def has_view_permission(self, request, obj=None):
        return request.user.is_superuser
        
        
        
        
 
 
  
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
  
  """
    Register the Transaction model into the admin.
    Add some customisation.
  """
  
  date_hierarchy = 'date'

  list_display = ('id', 'attendant', 'date')
  
  list_filter = ('date',)
 
  search_fields = ('id',)
  
  
  
  def has_add_permission(self, request):
        return False

  def has_change_permission(self, request, obj=None):
        return False

  def has_delete_permission(self, request, obj=None):
        return False

  def has_view_permission(self, request, obj=None):
        return request.user.is_superuser
        
        




@admin.register(Returns)
class ReturnsAdmin(admin.ModelAdmin):
  
  """
    Register the Returns model into the admin.
    Add some customisation.
  """
  
  date_hierarchy = 'date'

  list_display = ('item', 'size', 'color', 'quantity', 'date')
  
  list_filter = ('date',)
 
  search_fields = ('item__serial_no', 'item__name')
  
     
  def color(self, obj):
     verbose_name= 'Item color'
     return obj.item.color
     
  def size(self, obj):
     verbose_name= 'Item size'
     return obj.item.size
     
  def has_add_permission(self, request):
        return False

  def has_change_permission(self, request, obj=None):
        return False

  def has_delete_permission(self, request, obj=None):
        return False

  def has_view_permission(self, request, obj=None):
        return request.user.is_superuser
        