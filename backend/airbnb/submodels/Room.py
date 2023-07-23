from django.db import models

class Room(models.Model):
    # Model representing a Room for rent

    name = models.CharField(max_length=100)
    owner = models.ForeignKey('User')

    # map
    # address
    # info access

    # dates for rent
    max_num_people = models.IntegerField()

    price = models.IntegerField()
    price_per_person = models.IntegerField()

    num_of_beds = models.IntegerField()
    num_of_bedrooms = models.IntegerField()
    num_of_bathrooms = models.IntegerField()

    TYPE_CHOICES = (
        ('p', 'Private'),
        ('s', 'Shared'),
        ('h', 'House'),
    )

    room_type = models.CharField(
        max_length = 1,
        choices = TYPE_CHOICES,
    )

    area = models.IntegerField()

    # Extra services
    living_room = models.BooleanField()
    wifi = models.BooleanField()
    air_condition = models.BooleanField()
