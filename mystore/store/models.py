from django.db import models
import uuid


def path(instance, filename):
  return 'item_{0}/{1}'.format(instance.id, filename)

# Create your models here.


class Item(models.Model):
  
   """
   store data of a single item.
   
   only sold, sub-catg and mugshot fields are nullable.

   """
    
   serial_no = models.CharField(max_length=30, unique=True)
   name = models.CharField(max_length=40)
   category = models.CharField(max_length=7)
   sub_catg = models.CharField(max_length=7)
   color = models.CharField(max_length=20)
   size = models.CharField(max_length=7)
   description = models.TextField()
   quantity = models.IntegerField()
   cost_price = models.CharField(max_length=50, verbose_name='cost price($)')
   selling_price = models.CharField(max_length=50, verbose_name='selling price($)')
   sold = models.IntegerField(null=True, blank=True)
   mugshot = models.ImageField(upload_to=path, null=True, blank=True)
   
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
      if quantity >= sold:
        super().save(*args, **kwargs) 
        
      return "sold can't be greater than quantity"
        
      
   
   
   
class Sale(models.Model):
  
  """
   store data of a sale.

   every field is required except date which is auto-generated.

  """
 
  serial_no = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text="an auto generated uuid4 string for sales ID")
  name = models.CharField(max_length=40)
  category = models.CharField(max_length=50)
  sub_catg = models.CharField(max_length=7, verbose_name="sub_category")
  color = models.CharField(max_length=20)
  size = models.CharField(max_length=5)
  sold = models.IntegerField()
  price = models.CharField(max_length=50, verbose_name='price($)')
  transaction = models.ForeignKey("Transaction", on_delete=models.SET_NULL, null=True, blank=True, related_name="sales")
  date = models.DateTimeField(auto_now_add=True)
  
  
  def __str__(self):
    "Returns the sale tag"
    total = self.sold * float(self.price)
    tag = '%s (total: %s)' % (self.serial_no, total)
    return tag

  # over ride the save method
  def save(self, *args, **kwargs):
     price = self.price
     try:
        x = int(price)
        super().save(*args, **kwargs) 
     except:
        return "price field can only be integer or decimal"
  
      
   
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
    tag = '(buyer: %s), (attendant: %s)' % (self.buyer, self.attendant)
    return tag
  
 
 