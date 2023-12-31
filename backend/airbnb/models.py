from django.db import models

from django.urls import reverse # Used to generenate URLs by reversing the URL patterns
import uuid # Required for unique room instances

from django.conf import settings

# Create your models here.

class Room(models.Model):
    # Model representing a Room for rent

    name = models.CharField(max_length=100) # Name of the room
    desc = models.TextField() # Description of the room
    
    photo = models.ImageField(upload_to='uploads/rooms', default='default_room.jpg')
    
    # An owner can have multiple rooms, but each room has only one owner
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    # Coordinates for the map
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(max_length = 100)
    transportation = models.CharField(max_length = 100)

    # Dates for rent: available between dates date_start and date_end
    date_start = models.DateField()
    date_end = models.DateField()
    
    price_per_day = models.IntegerField() # How much it cost per day (min cose)
    price_per_person = models.IntegerField() # ...and how much extra each guest pays
    max_num_people = models.IntegerField() # Guest capacity
    
    rules = models.CharField(max_length = 100)
    num_of_beds = models.IntegerField()
    num_of_bedrooms = models.IntegerField()
    num_of_bathrooms = models.IntegerField()

    # Each room can either be private, shared or a whole house
    TYPE_CHOICES = (('p', 'Private'), ('s', 'Shared'), ('h', 'House'),)
    
    room_type = models.CharField(
        max_length = 1,
        choices = TYPE_CHOICES,
    )

    area = models.IntegerField()

    # Extra services that may or may not be included
    living_room = models.BooleanField(default=False)
    wifi = models.BooleanField(default=False)
    air_condition = models.BooleanField(default=False)
    heating = models.BooleanField(default=False)
    stove = models.BooleanField(default=False)
    television = models.BooleanField(default=False)
    parking = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)

    # ---- Methods ----
    
    def __str__(self):
        return self.name
    
class Review(models.Model):
    # Model representing a Review for a room
    
    # An user can have multiple reviews, but each review has only one user
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    
    room = models.ForeignKey('Room', on_delete=models.SET_NULL, null=True)
    
    score = models.IntegerField()
    review_text = models.TextField()
    
    date = models.DateField()
    
    # ---- Methods ----
    
    def __str__(self):
        return 'Review ' + str(self.id)

class Message(models.Model):
    
    renter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='renter')
 
    host = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='host')

    message_text = models.TextField(max_length=500)

    previous_message=models.ForeignKey('Message', on_delete=models.SET_NULL, null=True)
    
    date = models.DateField()
    
    # ---- Methods ----
    
    def __str__(self):
        return str(self.id)
    
class Rent(models.Model):

    renter=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    room_id=models.ForeignKey('Room', on_delete=models.SET_NULL, null=True)

    date_start=models.DateField()

    date_end=models.DateField()

    def __str__(self):
        return '#'+str(self.id)
    
class Test(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=400, default='DESCRIPTION')
    
    def __str__(self):
        return self.title
    
class Image(models.Model):
    
    room = models.ForeignKey('Room', on_delete=models.SET_NULL, null=True)

    image = models.ImageField(null=False, blank=False)
    description = models.TextField(max_length=100, null=False)

    def str(self):
        return str(self.id)