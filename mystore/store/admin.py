from django.contrib import admin
from django.contrib.admin.models import LogEntry,DELETION
from django.utils.html import escape
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Item
from .form import ItemAdminForm

# Register your models here.

admin.site.empty_value_display = '(None)'
admin.site.list_per_page = 50
admin.site.site_header = 'MY STORE'
admin.site.index_title = " My Store Management"
admin.site.site_title = "Store Admin"



@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
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
        'object_link',
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

    def object_link(self, obj):
        if obj.action_flag == DELETION:
            link = escape(obj.object_repr)
        else:
            ct = obj.content_type
            link = '<a href="%s">%s</a>' % (
                reverse('admin:%s_%s_change' % (ct.app_label, ct.model), args=[obj.object_id]),
                escape(obj.object_repr),
            )
        return mark_safe(link)
    object_link.admin_order_field = "object_repr"
    object_link.short_description = "object"


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
  form = ItemAdminForm
  fieldsets = (
    (None, {
      'classes': ('extrapretty'),
      'fields': ('serial_no', 'name')
    }),
    
    ('Details', {
      'classes': ('extrapretty'),
      'fields': ('mugshot', 'category', 'sub_category', 'description', 'price', 'quantity', 'sold')
    }),
    )
    
  list_display = ('serial_no', 'name', 'category_subcategory', 'price', 'stock', 'sold', 'description')
  

  search_fields = ('name', 'category', 'sub_category', 'description')
  
      
  def category_subcategory(self, obj):
     "return the category and sub_category as a string"
     verbose_name= ' category & subcategory '
     return " %s | %s " % (obj.category, obj.sub_category)
  category_subcategory.short_description = 'category | subcategory'
     
  def stock(self, obj):
     "return amount left for an item"
     if obj.sold:
       return obj.quantity - obj.sold
     else:
       return obj.quantity