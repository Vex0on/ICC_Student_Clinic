from django.db import transaction
from rest_framework import serializers

from .models import Student, User


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data.get("email"),
            username=validated_data.get("email"),
        )
        user.set_password(validated_data.get("password"))
        user.save()

        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    username = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = "__all__"

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.username = validated_data.get("email", instance.username)

        password = validated_data.get("password")
        if password:
            instance.set_password(password)

        instance.save()

        return instance


class StudentCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        with transaction.atomic():
            user_serializer = UserSerializer(data=user_data)
            if user_serializer.is_valid():
                user = user_serializer.save()

            student = Student.objects.create(user=user, **validated_data)

        return student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class StudentUpdateSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)
    pesel = serializers.CharField(required=False)
    phone_number = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    index_number = serializers.CharField(required=False)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Student
        fields = "__all__"
