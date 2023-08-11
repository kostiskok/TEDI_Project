from django.db import models
from django.contrib.auth.models import AbstractUser

from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class CustomUser(AbstractUser):
    
    # STATUS = {
    #     ('r', 'regular'),
    #     ('h', 'host'),
    #     ('m', 'moderator')
    # }
    
    email = models.EmailField(null=False)
    # status = models.CharField(max_length=1, choices=STATUS, default='r')
    # phone = models.CharField(max_length=10)
    photo = models.ImageField(upload_to='uploads/', default='default_avatar.jpg')
    phone = PhoneNumberField(null=False)
    
    def __str__(self):
        return self.username
    