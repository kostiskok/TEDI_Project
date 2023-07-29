from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    
    STATUS = {
        ('r', 'regular'),
        ('h', 'host'),
        ('m', 'moderator')
    }
    
    email = models.EmailField(unique=True)
    status = models.CharField(max_length=1, choices=STATUS, default='r')
    phone = models.CharField(max_length=10)
    
    def __str__(self):
        return self.username
    