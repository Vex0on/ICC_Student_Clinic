from django.contrib import admin

from .models import *


@admin.register(User)
class User(admin.ModelAdmin):
    list_display = ["id", "email", "username"]


@admin.register(Student)
class Student(admin.ModelAdmin):
    list_display = ["id", "first_name", "last_name", "index_number"]


@admin.register(Doctor)
class Doctor(admin.ModelAdmin):
    list_display = ["id", "first_name", "last_name", "specialization"]


@admin.register(Medication)
class Medication(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(UseMedication)
class UseMedication(admin.ModelAdmin):
    list_display = ["id", "date_of_use"]


@admin.register(Prescription)
class Prescription(admin.ModelAdmin):
    list_display = ["id"]


@admin.register(Visit)
class Visit(admin.ModelAdmin):
    list_display = ["id", "date_of_visit"]