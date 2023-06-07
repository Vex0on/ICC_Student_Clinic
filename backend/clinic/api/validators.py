import PIL
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import *


# User

def validate_password(password):
    one_number = any(letter.isdigit() for letter in password)
    one_big = any(letter.isupper() for letter in password)

    if len(password) < 8:
        raise serializers.ValidationError(
            "Haslo nie moze byc krotsze niz 8 znakow"
        )
    if not one_number:
        raise serializers.ValidationError(
            "Haslo powinno zawierac przynajmniej jedna cyfre"
        )
    if not one_big:
        raise serializers.ValidationError(
            "Haslo powinno zawierac przynajmniej jedna duza litere"
        )

    return password


def validate_email(email):

    if "@" not in email:
        raise serializers.ValidationError("Zly email")

    if any(letter.isupper() for letter in email):
        raise serializers.ValidationError("Email nie moze zawierac duzych liter")

    if User.objects.filter(email=email):
        raise serializers.ValidationError(
            "Uzytkownik z tym mailem istnieje"
        )

    return email


def validate_image(image):
    allowed_extensions = ["PNG", "JPEG"]

    pil_image = PIL.Image.open(image)
    if pil_image.format not in allowed_extensions:
        raise serializers.ValidationError("Dozwolone formaty zdjecia: PNG, JPEG.")

# Student


def validate_pesel(pesel):

    if not pesel.isdigit():
        raise ValidationError("Number PESEL nie moze miec liter")

    if pesel.isdigit() and len(pesel) != 11:
        raise ValidationError("Numer PESEL powinien zawierac 11 znakow")

    weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
    checksum = 0

    for i in range(10):
        checksum += int(pesel[i]) * weights[i]

    control_digit = (10 - (checksum % 10)) % 10
    if control_digit != int(pesel[10]):
        raise ValidationError("Zla cyfra kontrolna")

    if Student.objects.filter(pesel=pesel):
        raise serializers.ValidationError("Podany PESEL jest zajety")


def validate_index_number(index_number):
    if not index_number.isdigit() or len(index_number) != 6:
        raise ValidationError("Zly numer indeksu")

    if Student.objects.filter(index_number=index_number):
        raise serializers.ValidationError("Numer indeksu jest juz uzywany")


def validate_phone_number(phone_number):
    if not phone_number.isdigit():
        raise serializers.ValidationError("Zły numer telefonu")

    if len(phone_number) != 9:
        raise serializers.ValidationError("Numer telefonu powinien zawierać 9 cyfr")

    if Student.objects.filter(phone_number=phone_number).exists():
        raise serializers.ValidationError("Numer telefonu jest aktualnie używany")

    return phone_number
