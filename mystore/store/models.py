from django.db import models
from django.core.exceptions import ValidationError
import uuid


def path(instance, filename):
  #create a unique path for item mugshot.
  return 'item_{0}/{1}'.format(instance.id, filename)
  
def castValidator(value):
   #try to cast CharField to float and throw error on failure
   try:
     float(value)
   except:
     error = "Only decimal and integer is valid for this field"
     raise ValidationError(error)



# Create your models here.


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
   cost_price = models.CharField(max_length=20, verbose_name='cost price($)', validators=[castValidator])
   selling_price = models.CharField(max_length=20, verbose_name='selling price($)', validators=[castValidator])
   sold = models.IntegerField(null=True, blank=True)
   returned = models.IntegerField(null=True, blank=True)
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
  sub_catg = models.CharField(max_length=20, null=True,  blank=True)
  sold = models.IntegerField()
  cost_price = models.CharField(max_length=20)
  selling_price = models.CharField(max_length=20)
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
  
  buyer = models.CharField(max_length=20)
  attendant = models.CharField(max_length=20)
  date = models.DateField(auto_now_add=True)
  
  def __str__(self):
    "Returns the transaction tag"
    tag = '%s(date: %s)' % (self.buyer, self.date)
    return tag
  
 
 