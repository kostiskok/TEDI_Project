# Generated by Django 4.2.3 on 2023-08-11 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='')),
                ('description', models.TextField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message_text', models.TextField(max_length=500)),
                ('date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Rent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_start', models.DateField()),
                ('date_end', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField()),
                ('review_text', models.TextField()),
                ('date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('desc', models.TextField()),
                ('photo', models.ImageField(default='uploads/default_room.jpg', upload_to='uploads/rooms')),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('address', models.CharField(max_length=100)),
                ('transportation', models.CharField(max_length=100)),
                ('date_start', models.DateField()),
                ('date_end', models.DateField()),
                ('price_per_day', models.IntegerField()),
                ('price_per_person', models.IntegerField()),
                ('max_num_people', models.IntegerField()),
                ('rules', models.CharField(max_length=100)),
                ('num_of_beds', models.IntegerField()),
                ('num_of_bedrooms', models.IntegerField()),
                ('num_of_bathrooms', models.IntegerField()),
                ('room_type', models.CharField(choices=[('p', 'Private'), ('s', 'Shared'), ('h', 'House')], max_length=1)),
                ('area', models.IntegerField()),
                ('living_room', models.BooleanField(default=False)),
                ('wifi', models.BooleanField(default=False)),
                ('air_condition', models.BooleanField(default=False)),
                ('heating', models.BooleanField(default=False)),
                ('stove', models.BooleanField(default=False)),
                ('television', models.BooleanField(default=False)),
                ('parking', models.BooleanField(default=False)),
                ('elevator', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(default='DESCRIPTION', max_length=400)),
            ],
        ),
    ]
