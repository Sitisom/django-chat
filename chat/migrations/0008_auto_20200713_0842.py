# Generated by Django 2.2 on 2020-07-13 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_auto_20200712_2044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='chatname',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]