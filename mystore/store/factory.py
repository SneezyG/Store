import factory
from models import *


class PostFactory(factory.Factory):

  class Meta: 
      model = Item
  
  serial_no = models.CharField(max_length=20, unique=True, verbose_name='barcode')
  serial_no = factory.sequence(lamda n: 'serial_%d' % n)
  
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