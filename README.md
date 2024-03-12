# Store
A point-of-sale Web application for a bulk store, Seeded the app with some data for testing purposes


## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Specification](#specification)
4. [User](#user)
5. [User-story](#user-story)




## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the root directory:

    ```bash
    cd <root-directory>
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```
    
    
    

## Usage

1. Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

2. Start the development server:

    ```bash
    python manage.py runserver
    ```

3. Open your web browser and navigate to [http://localhost:8000](http://localhost:8000) to view the project.

4. Access the Django admin interface at [http://localhost:8000/admin/store](http://localhost:8000/admin/store).

5. Authenticate with any of these [User](#user) credentials to play around the application.





## Specification

FUNCTIONALITY.
look up store items.
update items record with csv and excel files.
sales report analytics dashboard.
record sales and transactions.
record returns items.

KEY-FEATURES.
users authentication and authorisation.
users management 
sales analytics dashboard
logging system.
customizable admin interface.
responsive interface across devices
drag and drop file box for items update.





## User

1. attendant - process sales and transactions(admin: view items permission).
2. supervisor - process items update and return(admin: full items permission).
3. manager(superuser)- view sales report(admin: superuser permission).

SEEDED THE APP WITH 3 USERS.
manager: (hshs627£-;"+#).
supervisor: (hshsj7373-£+).
attendant: (wyeha272#£).





## User-story

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








