from django.contrib.auth.models import AbstractUser
from django.db import models


def user_profile_picture_path(instance, filename):
    return f"user-profile-pictures/user_{instance.id}/{filename}"
class User(AbstractUser):
    email = models.CharField(max_length=45, null=False, unique=True)
    password = models.CharField(max_length=45, null=False)
    profile_picture = models.ImageField(upload_to=user_profile_picture_path, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.id} {self.email}"


class Student(models.Model):
    first_name = models.CharField(max_length=45, null=False)
    last_name = models.CharField(max_length=45, null=False)
    date_of_birth = models.DateField()
    pesel = models.CharField(max_length=11, null=False, unique=True)
    phone_number = models.CharField(max_length=9, null=False, unique=True)
    address = models.CharField(max_length=95, null=False)
    index_number = models.CharField(max_length=6, null=False, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} {self.first_name} {self.last_name} {self.index_number}"
