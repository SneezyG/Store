from django.db import models


def path(instance, filename):
  return 'item_{0}/{1}'.format(instance.id, filename)

# Create your models here.


class Item(models.Model):
   """
   store data of a single item.
   only sold, sub-catg and mugshot fields are nullable.
   have a left method that return the amount left for an item

   """
   sizeType = (
       ('S', 'Small'),
       ('L', 'Large'),
       ('Xl', 'XLarge'),
       ('XXl', 'XXLarge'),
       ('XXXl', 'XXXLarge')
     )
     
   catgType = (
     )
     
   colorType = (
     )
     
   serial_no = models.CharField(max_length=30, unique=True)
   name = models.CharField(max_length=40)
   category = models.CharField(max_length=50, choices=catgType)
   color = models.CharField(max_length=20, choices=colorType)
   size = models.CharField(max_length=5, choices=sizeType, verbose_name='size(ft)')
   description = models.TextField()
   quantity = models.IntegerField()
   price = models.CharField(max_length=50, verbose_name='price($)')
   sold = models.IntegerField(null=True, blank=True)
   mugshot = models.ImageField(upload_to=path, null=True, blank=True)
   
   
   
class Sale(models.Model):
  pass
   
   
   
   
 
 