# Generated by Django 4.1 on 2022-08-17 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_alter_sale_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='sub_catg',
            field=models.CharField(max_length=7, verbose_name='sub_category'),
        ),
    ]
