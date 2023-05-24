from django.contrib import admin

from .models import Student, User


@admin.register(User)
class User(admin.ModelAdmin):
    list_display = ["id", "email", "username"]


@admin.register(Student)
class Student(admin.ModelAdmin):
    list_display = ["id", "first_name", "last_name", "index_number"]
