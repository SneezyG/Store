from dataclasses import dataclass

@dataclass
class Item:
   serial_no: str
   name: str
   category: str
   sub_catg: str
   color: str
   size: str
   description: str
   quantity: int
   cost_price: float
   selling_price: float
   sold: int
   mugshot: str
   date: str