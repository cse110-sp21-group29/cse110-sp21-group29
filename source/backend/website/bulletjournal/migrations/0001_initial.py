# Generated by Django 3.2.2 on 2021-06-04 00:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='daily',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice_text', models.CharField(max_length=1000)),
                ('modified_date', models.DateField(auto_now=True)),
            ],
        ),
    ]
