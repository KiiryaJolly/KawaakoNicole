from email.policy import default
from django.db import models

# Create your models here.
class Task(models.Model):
    name= models.CharField(max_length=200)
    completed = models.BooleanField(default=False, null=True, blank=True)
    deadline = models.DateField(null=True)
    
    # deadline = models.DateTimeField(null=True, default=datetime.date.today())
    
    
    def __str__(self):
        return self.name
    
    
class UserAccount(models.Model):
    username = models.CharField(max_length=50, unique=True)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=20)
    # password = models.CharField(max_length=20)
    
    def __str__(self):
        return self.firstname + ' ' + self.lastname