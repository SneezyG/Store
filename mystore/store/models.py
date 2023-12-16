
from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser
import uuid


def path(instance, filename):
  #create a unique path for item mugshot.
  return 'item_{0}/{1}'.format(instance.id, filename)
  


# Create your models here.

class User(AbstractUser): 
  
  """
  store a single user data.
  extend the django abstract-user class.
  and this model is the new auth_user_model
  """
  
  userType = (
      ('manager', 'manager'),
      ('supervisor', 'supervisor'),
      ('attendant', 'attendant'),
    )
  
  user_type = models.CharField(max_length=12, choices=userType, help_text="This field define the user access level to the store panel.")



class Item(models.Model):
  
   """
   store data of a single item.
   """
    
   serial_no = models.CharField(max_length=20, unique=True, verbose_name='barcode')
   name = models.CharField(max_length=20)
   category = models.CharField(max_length=20)
   sub_catg = models.CharField(max_length=20, null=True, blank=True, verbose_name="sub-category")
   color = models.CharField(max_length=20, null=True, blank=True)
   size = models.CharField(max_length=20, null=True, blank=True)
   description = models.TextField(null=True, blank=True)
   quantity = models.IntegerField()
   cost_price = models.DecimalField(max_digits=15, decimal_places=2, verbose_name='cost price($)')
   selling_price = models.DecimalField(max_digits=15, decimal_places=2, verbose_name='selling price($)')
   sold = models.IntegerField(null=True, blank=True)
   mugshot = models.ImageField(upload_to=path, null=True, blank=True)
   date = models.DateTimeField(auto_now=True)
   
   def __str__(self):
    "Returns the item tag name"
    tag = '%s (%s | %s)' % (self.name, self.category, self.sub_catg)
    return tag.title()
        
      
   
   
   
class Sale(models.Model):
  
  """
   store data of a sale.
   Every field is required except date which is auto-generated.
  """
 
  serial_no = models.CharField(max_length=20, verbose_name='barcode')
  name = models.CharField(max_length=20)
  category = models.CharField(max_length=20)
  sub_catg = models.CharField(max_length=20)
  sold = models.IntegerField()
  total_profit = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="total profit($)")
  cost_price = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="cost price($)")
  selling_price = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="selling price($)")
  transaction = models.ForeignKey("Transaction", on_delete=models.SET_NULL, null=True, blank=True, related_name="sales")
  date = models.DateField(auto_now_add=True);
  date_test = models.DateField();
  
  
  def __str__(self):
    "Returns the sale tag"
    tag = '%s(sold: %s)' % (self.name, self.sold)
    return tag

  
      
 
   
class Transaction(models.Model):
  
  """
  store data of a Transaction which technically involve a group of sales.
  """
  attendant = models.CharField(max_length=20)
  date = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    "Returns the transaction tag"
    tag = '%s(date: %s)' % (self.attendant, self.date)
    return tag



class Return(models.Model):
  """
  store item return data
  """
  
  item = models.ForeignKey("Item", on_delete=models.SET_NULL, null=True, blank=True, related_name="returns")
  quantity = models.IntegerField()
  date = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    "Returns the returns obj tag"
    tag = '%s(date: %s)' % (self.item.name, self.date)
    return tag

  
  
  
 
 