# Generated by Django 4.1 on 2022-08-07 13:55

from django.db import migrations, models
import store.models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='mugshot',
            field=models.ImageField(blank=True, null=True, upload_to=store.models.path),
        ),
        migrations.AlterField(
            model_name='item',
            name='sold',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='sub_category',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
