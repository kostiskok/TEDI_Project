from django.db import models

from django.urls import reverse # Used to generenate URLs by reversing the URL patterns
import uuid # Required for unique room instances

from django.contrib.auth.models import User

# Create your models here.

# class Todo(models.Model):
#     title = models.CharField(max_length=120)
#     description = models.TextField()
#     completed = models.BooleanField(default=False)

#     def _str_(self):
#         return self.title

class Room(models.Model):
    # Model representing a Room for rent

    # Unique ID for this room
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)

    name = models.CharField(max_length=100) # Name of the room
    desc = models.TextField() # Description of the room
    
    # An owner can have multiple rooms, but each room has only one owner
    owner = models.ForeignKey('MyUser', on_delete=models.SET_NULL, null=True)

    # Coordinates for the map
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(max_length = 100)
    # info access

    # Dates for rent: available between dates date_start and date_end
    date_start = models.DateField()
    date_end = models.DateField()
    
    price_per_day = models.IntegerField() # How much it cost per day (min cose)
    price_per_person = models.IntegerField() # ...and how much extra each guest pays
    max_num_people = models.IntegerField() # Guest capacity

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

    def get_absolute_url(self):
        """Returns the URL to access a particular instance of the room."""
        return reverse('room', args=[str(self.id)])
    
class Review(models.Model):
    # Model representing a Review for a room

    # Unique ID for this review
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    
    # An user can have multiple reviews, but each review has only one user
    user = models.ForeignKey('MyUser', on_delete=models.SET_NULL, null=True)
    
    score = models.IntegerField()
    review_text = models.TextField()
    
    date = models.DateField()
    
    # ---- Methods ----
    
    def __str__(self):
        return self.id

    def get_absolute_url(self):
        """Returns the URL to access a particular instance of the review."""
        return reverse('review', args=[str(self.id)])

class Messages(models.Model):

    # Unique ID for this message
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)

    sender=models.ForeignKey('MyUser', on_delete=models.SET_NULL, null=True, related_name='sender')

    receiver=models.ForeignKey('MyUser', on_delete=models.SET_NULL, null=True, related_name='receiver')

    room_id=models.ForeignKey('Room', on_delete=models.SET_NULL, null=True)

    previous_message=models.ForeignKey('Messages', on_delete=models.SET_NULL, null=True)
    
    # ---- Methods ----
    
    def __str__(self):
        return self.id
    
class Rent(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)

    renter=models.ForeignKey('MyUser', on_delete=models.SET_NULL, null=True)

    room_id=models.ForeignKey('Room', on_delete=models.SET_NULL, null=True)

    date_start=models.DateField()

    date_end=models.DateField()
    
class MyUser(User):

    phone = models.CharField(max_length=10)

    #photo = models.ImageField()