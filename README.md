# Store
A point-of-sale Web application for a bulk store. 

FUNCTIONALITY:
look up store items.
update items record with csv and excel files.
sales report analytics dashboard.
record sales and transactions.
record returns items.


KEY-FEATURES:
users authentication and authorisation.
users management 
sales analytics dashboard
logging system.
customizable admin interface.
responsive interface across devices
drag and drop file box for items update.



There will be 3 type of user.
1. attendant - process sales and transactions(admin: view items permission).
2. supervisor - process items update and return(admin: full items permission).
3. manager(superuser)- view sales report(admin: superuser permission).




user stories

SALE ATTENDANT: process transactions.
login into the application sale-panel page.
look up item using their barcode and check their availability.
set item quantity and add item to basket.
view items basket, total amount, total item.
process sale for items in basket and general a receipt.

SUPERVISOR: update items model.
login into the application admin interface.
click the item model.
add, delete and modify items

SUPERVISOR: update items record.
login into the application update page.
drop a csv or excel file containing new items record into the dropbox.
click the process button.

SUPERVISOR: update items returns.
login into the application returns page.
enter returned item barcode.
enter the receipt id to verify purchase.
enter returned amount.
click process button.

MANAGER: view sale report.
login into the application report page.
view report summary.
view sales and report charts.

MANAGER: update admin models.
login into the application admin interface.
select a model.
add, delete and modify model records.








