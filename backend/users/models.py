from django.db import models
from django.contrib.auth.models import AbstractUser

from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class CustomUser(AbstractUser):
    
    #already existing:
    #username, password, first name, last name
    
    # STATUS = {
    #     ('r', 'regular'),
    #     ('h', 'host'),
    # }
    # status = models.CharField(max_length=1, choices=STATUS, default='r')
    
    email = models.EmailField(null=False)
    photo = models.ImageField(upload_to='uploads/users', default='default_avatar.jpg')
    phone = PhoneNumberField(null=False)

    isRenter = models.BooleanField(default=False)
    
    isHost = models.BooleanField(default=False)
    waitingHost = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username
    