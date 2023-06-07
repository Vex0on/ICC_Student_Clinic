from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver


def user_profile_picture_path(instance, filename):
    return f"user-profile-pictures/user_{instance.id}/{filename}"


class User(AbstractUser):
    email = models.EmailField(null=False, unique=True)
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


class Reception(models.Model):
    first_name = models.CharField(max_length=45, null=False)
    last_name = models.CharField(max_length=45, null=False)
    date_of_birth = models.DateField()
    pesel = models.CharField(max_length=11, null=False, unique=True)
    phone_number = models.CharField(max_length=9, null=False, unique=True)
    address = models.CharField(max_length=95, null=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} {self.first_name} {self.last_name}"


class Doctor(models.Model):
    first_name = models.CharField(max_length=45, null=False)
    last_name = models.CharField(max_length=45, null=False)
    date_of_birth = models.DateField()
    pesel = models.CharField(max_length=11, null=False, unique=True)
    phone_number = models.CharField(max_length=9, null=False, unique=True)
    address = models.CharField(max_length=95, null=False)
    specialization = models.CharField(max_length=20, null=False)
    years_of_experience = models.SmallIntegerField(null=False)
    other_specializations = models.TextField(null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} {self.first_name} {self.last_name} {self.specialization}"


class Medication(models.Model):
    name = models.CharField(max_length=90)

    def __str__(self):
        return self.name


class Visit(models.Model):
    date_of_visit = models.DateTimeField()
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    medication = models.ManyToManyField(Medication)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id} {self.date_of_visit}"


class Documentation(models.Model):
    student = models.OneToOneField(Student, on_delete=models.SET_NULL, null=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)
    current_health = models.TextField()
    sickness_history = models.TextField()
    treatment_plan = models.TextField()
    medication_list = models.TextField()
    medical_examination = models.TextField()

    def __str__(self):
        return f"{self.id} {self.student} {self.doctor}"

