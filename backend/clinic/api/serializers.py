from .validators import *
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *
import datetime


def calculate_birth_date(pesel):
    year = int(pesel[0:2])
    month = int(pesel[2:4])
    day = int(pesel[4:6])

    if 0 < month < 13:
        year += 1900
    elif 20 < month < 33:
        year += 2000
        month -= 20

    birth_date = datetime.date(year, month, day)
    return birth_date


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        if hasattr(user, "doctor"):
            token["role"] = "doctor"
            token["id"] = user.doctor.id
        elif hasattr(user, "reception"):
            token["role"] = "reception"
            token["id"] = user.reception.id
        else:
            token["role"] = "student"
            token["id"] = user.student.id

        return token


class UserProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["profile_picture"]


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)

    def __init__(self, *args, **kwargs):
        super(UserSerializer, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].error_messages["blank"] = "To pole nie moze byc puste"

    class Meta:
        model = User
        fields = "__all__"

    email = serializers.EmailField(
        validators=[validate_email],
        required=False
    )

    password = serializers.CharField(
        validators=[validate_password],
        write_only=True,
        required=False,
    )

    profile_picture = serializers.ImageField(
        validators=[validate_image],
        required=False,
    )

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data.get("email"),
            username=validated_data.get("email").split("@")[0]
        )
        user.set_password(validated_data.get("password"))
        user.save()

        return user


class StudentCreateSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DateField(required=False)
    user = UserSerializer()

    def __init__(self, *args, **kwargs):
        super(StudentCreateSerializer, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].error_messages["blank"] = "To pole nie moze byc puste"

    class Meta:
        model = Student
        fields = "__all__"

    first_name = serializers.CharField(validators=[validate_first_name],
                                       required=False)

    last_name = serializers.CharField(validators=[validate_last_name],
                                      required=False)

    phone_number = serializers.CharField(validators=[validate_phone_number],
                                         required=False, )

    index_number = serializers.CharField(validators=[validate_index_number],
                                         required=False, )

    pesel = serializers.CharField(validators=[validate_pesel],
                                  required=False, )

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        with transaction.atomic():
            user_serializer = UserSerializer(data=user_data)
            if user_serializer.is_valid():
                user = user_serializer.save()

            pesel = validated_data.get("pesel")
            if pesel:
                birth_date = calculate_birth_date(pesel)
                validated_data["date_of_birth"] = birth_date

            student = Student.objects.create(user=user, **validated_data)

        return student


class UserUpdateSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = "__all__"

    email = serializers.EmailField(
        validators=[validate_email],
        required=False
    )

    profile_picture = serializers.ImageField(
        validators=[validate_image],
        required=False,
    )

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.username = validated_data.get("username", instance.username)
        instance.profile_picture = validated_data.get("profile_picture", instance.profile_picture)

        password = validated_data.get("password")
        if password:
            instance.set_password(password)

        instance.save()

        return instance


class StudentSerializer(serializers.ModelSerializer):
    user = UserProfilePictureSerializer()
    phone_number = serializers.SerializerMethodField()

    def get_phone_number(self, obj):
        return f"{obj.phone_number[:3]}-{obj.phone_number[3:6]}-{obj.phone_number[6:]}"

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
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Student
        fields = "__all__"

    phone_number = serializers.CharField(validators=[validate_phone_number],
                                         required=False, )

    index_number = serializers.CharField(validators=[validate_index_number],
                                         required=False, )

    pesel = serializers.CharField(validators=[validate_pesel],
                                  required=False, )


class StudentNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["first_name", "last_name"]


class DoctorCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    other_specializations = serializers.CharField(allow_blank=True)

    class Meta:
        model = Doctor
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        with transaction.atomic():
            user_serializer = UserSerializer(data=user_data)
            if user_serializer.is_valid():
                user = user_serializer.save()

            doctor = Doctor.objects.create(user=user, **validated_data)

        return doctor

    phone_number = serializers.CharField(validators=[validate_phone_number],
                                         required=False, )

    pesel = serializers.CharField(validators=[validate_pesel],
                                  required=False, )


class DoctorSerializer(serializers.ModelSerializer):
    user = UserProfilePictureSerializer()
    phone_number = serializers.SerializerMethodField()

    def get_phone_number(self, obj):
        return f"{obj.phone_number[:3]}-{obj.phone_number[3:6]}-{obj.phone_number[6:]}"

    class Meta:
        model = Doctor
        fields = "__all__"


class DoctorUpdateSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)
    pesel = serializers.CharField(required=False)
    phone_number = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    specialization = serializers.CharField(required=False)
    years_of_experience = serializers.IntegerField(required=False)
    other_specializations = serializers.CharField(required=False)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Doctor
        fields = "__all__"

    phone_number = serializers.CharField(validators=[validate_phone_number],
                                         required=False, )

    pesel = serializers.CharField(validators=[validate_pesel],
                                  required=False, )


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = "__all__"


class MedicationUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)

    class Meta:
        model = Medication
        fields = "__all__"


class VisitSerializer(serializers.ModelSerializer):
    medication = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    description = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    doctor = DoctorSerializer()
    student = StudentSerializer()

    class Meta:
        model = Visit
        fields = "__all__"


class VisitUpdateSerializer(serializers.ModelSerializer):
    date = serializers.DateField(required=False)
    time = serializers.TimeField(required=False)
    doctor = serializers.PrimaryKeyRelatedField(read_only=True)
    student = serializers.PrimaryKeyRelatedField(read_only=True)
    description = serializers.CharField(required=False)
    medication = serializers.CharField(allow_blank=True, allow_null=True)

    class Meta:
        model = Visit


class BookedVisitSerializer(serializers.ModelSerializer):
    medication = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    description = serializers.CharField(allow_blank=True, allow_null=True, required=False)

    class Meta:
        model = Visit
        fields = "__all__"


class ReceptionSerializer(serializers.ModelSerializer):
    phone_number = serializers.SerializerMethodField()

    def get_phone_number(self, obj):
        return f"{obj.phone_number[:3]}-{obj.phone_number[3:6]}-{obj.phone_number[6:]}"

    class Meta:
        model = Reception
        fields = "__all__"


class ReceptionCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Reception
        exclude = ("user",)

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        with transaction.atomic():
            user_serializer = UserSerializer(data=user_data)
            if user_serializer.is_valid():
                user = user_serializer.save()

            reception = Reception.objects.create(user=user, **validated_data)

        return reception


class ReceptionUpdateSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)
    pesel = serializers.CharField(required=False)
    phone_number = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Reception
        fields = "__all__"


class DocumentationSerializer(serializers.ModelSerializer):
    current_health = serializers.CharField(required=False)
    sickness_history = serializers.CharField(required=False)
    treatment_plan = serializers.CharField(required=False)
    medication_list = serializers.CharField(required=False)
    medical_examination = serializers.CharField(required=False)

    class Meta:
        model = Documentation
        fields = "__all__"


class DocumentationGetSerializer(serializers.ModelSerializer):
    student = StudentNameSerializer()

    class Meta:
        model = Documentation
        fields = "__all__"
