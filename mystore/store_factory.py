import factory
from faker import Faker
from datetime import datetime

item_names = [
    "Milk", "Bread", "Eggs", "Cereal", "Pasta", "Rice", "Flour", "Sugar", "Coffee",
    "Tea", "Juice", "Water", "Soda", "Chips", "Soup", "Olive-Oil",
    "Spices", "Canned-Beans", "Toothpaste", "Shampoo", "Soap", "Tissues", "Diapers"
]

item_category = {
    "Dairy": ["Milk",],
    "Bakery": ["Bread",],
    "Produce": ["Rice", "Flour", "Eggs"],
    "Beverages": ["Cereal", "Pasta", "Sugar", "Tea", "Coffee"],
    "Snacks": ["Chips", "Soda", "Juice"],
    "Canned-foods": ["Canned-Beans", "Spices", "Soup"],
    "Personal-Care": ["Soap", "Shampoo", "Toothpaste"],
    "Household": ["Tissues", "Diapers", "Olive-Oil", "Water"]
}

colors = ["black", "blue", "red", "white", "yellow", "green", "grey"]

sizes = ["small", "medium", "big", "large", "extra-large"]


def get_category(name):
  categories = list(item_category.keys())
  
  for category in categories:
    items = item_category[category]
    if name in items:
      return category

  return "unknown"



class ItemFactory(factory.django.DjangoModelFactory):

  class Meta: 
      model = 'store.Item'
      django_get_or_create = ('serial_no',)
  
  
  serial_no = factory.Faker("ean8")
  name = factory.Faker("word", ext_word_list=item_names)
  category = factory.LazyAttribute(lambda obj: get_category(obj.name))
  color = factory.Faker("word", ext_word_list=colors)
  size = factory.Faker("word", ext_word_list=sizes)
  description = factory.Faker("paragraph")
  quantity = factory.Faker("random_int", min=10, max=50)
  cost_price = factory.Faker("random_number", digits=3, fix_len=True)
  selling_price = factory.Faker("random_number", digits=4, fix_len=True)
  sold = factory.Faker("random_int", min=0, max=30)
  
  
 
  
class SaleFactory(factory.django.DjangoModelFactory):

  class Meta: 
      model = 'store.Sale'
      
  name = factory.Faker("word", ext_word_list=item_names)
  category = factory.LazyAttribute(lambda obj: get_category(obj.name))
  sold = factory.Faker("random_int", min=2, max=20)
  total_profit = factory.Faker("random_number", digits=3, fix_len=True)
  cost_price = factory.Faker("random_number", digits=3, fix_len=True)
  selling_price = factory.Faker("random_number", digits=4, fix_len=True)
  date_test = factory.Faker('date_between', start_date=datetime(2023, 7, 15))