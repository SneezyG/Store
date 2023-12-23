from factories import ItemFactory
import csv
import pandas as pd

items = ItemFactory.create_batch(50)

# Write fake data to a CSV file
csv_file_path = 'items.csv'
with open(csv_file_path, 'w', newline='') as csv_file:
    fieldnames = ['barcode', 'name', 'category', 'sub-category', 'color', 'size', 'description', 'quantity', 'cost-price', 'selling-price', 'sold', 'mugshot', 'date']
    
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

    # Write header
    writer.writeheader()

    # Write data
    for item in items:
        writer.writerow({
          'barcode': item.serial_no, 
          'name': item.name, 
          'category': item.category, 
          'sub-category': item.sub_catg, 
          'color': item.color, 
          'size': item.size, 
          'description': item.description, 
          'quantity': item.quantity, 
          'cost-price': item.cost_price,
          'selling-price': item.selling_price, 
          'sold': item.sold, 
          'mugshot': item.mugshot, 
          'date': item.date
        })

print(f'Fake data written to {csv_file_path}')


df = pd.read_csv(csv_file_path)

# Convert and save to Excel
excel_file_path = 'items.xlsx'
df.to_excel(excel_file_path, index=False)

print(f'CSV file converted to Excel:{excel_file_path}')
