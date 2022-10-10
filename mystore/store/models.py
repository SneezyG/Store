from django.db import models
from django.core.exceptions import ValidationError
import uuid


def path(instance, filename):
  return 'item_{0}/{1}'.format(instance.id, filename)

# Create your models here.


class Item(models.Model):
  
   """
   store data of a single item.
   """
    
   serial_no = models.CharField(max_length=30, unique=True, verbose_name='barcode')
   name = models.CharField(max_length=40)
   category = models.CharField(max_length=7)
   sub_catg = models.CharField(max_length=7, null=True, blank=True)
   color = models.CharField(max_length=20, null=True, blank=True)
   size = models.CharField(max_length=7, null=True, blank=True)
   description = models.TextField(null=True, blank=True)
   quantity = models.IntegerField()
   cost_price = models.CharField(max_length=50, verbose_name='cost price($)')
   selling_price = models.CharField(max_length=50, verbose_name='selling price($)')
   sold = models.IntegerField(null=True, blank=True)
   returned = models.IntegerField(null=True, blank=True)
   mugshot = models.ImageField(upload_to=path, null=True, blank=True)
   date = models.DateTimeField(auto_now=True)
   
   def __str__(self):
    "Returns the item tag name"
    tag = '%s (%s | %s)' % (self.name, self.category, self.sub_catg)
    return tag.title()
    
    
   # over ride the save method
   def save(self, *args, **kwargs):
      quantity = self.quantity
      sold = self.sold
      if not sold:
        super().save(*args, **kwargs) 
        return
      if quantity >= sold:
        super().save(*args, **kwargs) 
        return
        
      text = "sold can't be greater than quantity"
      raise ValidationError(text)
        
      
   
   
   
class Sale(models.Model):
  
  """
   store data of a sale.

   Every field is required except date which is auto-generated.

  """
 
  serial_no = models.CharField(max_length=30, verbose_name='barcode')
  name = models.CharField(max_length=40)
  category = models.CharField(max_length=50)
  sub_catg = models.CharField(max_length=50)
  sold = models.IntegerField()
  cost_price = models.CharField(max_length=50)
  selling_price = models.CharField(max_length=50)
  transaction = models.ForeignKey("Transaction", on_delete=models.SET_NULL, null=True, blank=True, related_name="sales")
  date = models.DateTimeField(auto_now_add=True)
  
  
  def __str__(self):
    "Returns the sale tag"
    tag = '%s(sold: %s)' % (self.name, self.sold)
    return tag

  
      
 
   
class Transaction(models.Model):
  
  """
  store data of a Transaction which technically involve a group of sales
  """

  serial_no = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text="an auto generated uuid4 string for transaction ID")
  
  buyer = models.CharField(max_length=30)
  attendant = models.CharField(max_length=30)
  date = models.DateField(auto_now_add=True)
  
  def __str__(self):
    "Returns the transaction tag"
    tag = '%s(date: %s)' % (self.buyer, self.date)
    return tag
  
 
 