import csv

from django.core.mail import send_mail
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import *
from .serializers import *


# Register, login


class StudentRegister(APIView):
    def post(self, request):
        student_serializer = StudentCreateSerializer(data=request.data)
        if student_serializer.is_valid():
            student = student_serializer.save()
            documentation = Documentation.objects.create(student=student)
            visit_info = VisitInfo.objects.create(
                student=student,
                medications="",
                recommendations=""
            )
            return Response({"message": "HTTP_200_OK"}, status=status.HTTP_200_OK)
        else:
            return Response(
                student_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class Login(APIView):
    @csrf_exempt
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("User not found.")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password.")

        if not user.is_active:
            raise AuthenticationFailed("Confirm your email.")

        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])

        custom_token = MyTokenObtainPairSerializer.get_token(user)
        response = Response(
            {"access": str(custom_token.access_token)},
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            key="refresh",
            value=str(custom_token),
            httponly=True,
            samesite="Lax",
        )

        return response


# JWT


class AccessToken(APIView):
    def get(self, request):
        refresh_token = request.COOKIES.get("refresh")

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                user = User.objects.get(id=token["user_id"])
                new_access_token = str(token.access_token)

                response = Response({"access": new_access_token})
                response.set_cookie(
                    "refresh", refresh_token, httponly=True, samesite="Lax"
                )
                return response
            except User.DoesNotExist:
                return Response(
                    {"message": "HTTP_404_NOT_FOUND"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        return Response(
            {"message": "HTTP_400_BAD_REQUEST"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# User


class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(
            serializer.errors,
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


class UserDetail(APIView):
    def get(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            serializer = UserSerializer(user, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            serializer = UserUpdateSerializer(instance=user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY,
                )
        except User.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            user.delete()
            return Response(
                {"message": "user deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except User.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


# Student


class StudentList(APIView):
    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = StudentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(
            serializer.errors,
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


class StudentDetail(APIView):
    def get(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
            serializer = StudentSerializer(student, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Student.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
            serializer = StudentUpdateSerializer(instance=student, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY,
                )
        except Student.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
            student.delete()
            return Response(
                {"message": "student deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Student.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


# Reception


class ReceptionList(APIView):
    def get(self, request):
        receptions = Reception.objects.all()
        serializer = ReceptionSerializer(receptions, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = ReceptionCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(
            serializer.errors,
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


class ReceptionDetail(APIView):
    def get(self, request, pk):
        try:
            reception = Reception.objects.get(id=pk)
            serializer = ReceptionSerializer(reception, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Reception.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, pk):
        try:
            reception = Reception.objects.get(id=pk)
            serializer = ReceptionUpdateSerializer(
                instance=reception, data=request.data
            )
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY,
                )
        except Reception.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, pk):
        try:
            reception = Reception.objects.get(id=pk)
            reception.delete()
            return Response(
                {"message": "Reception deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Reception.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


# Doctor


class DoctorList(APIView):
    def get(self, request):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = DoctorCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(
            serializer.errors,
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


class DoctorDetail(APIView):
    def get(self, request, pk):
        try:
            doctor = Doctor.objects.get(id=pk)
            serializer = DoctorSerializer(doctor, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Doctor.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, pk):
        try:
            doctor = Doctor.objects.get(id=pk)
            serializer = DoctorUpdateSerializer(instance=doctor, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY,
                )
        except Doctor.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, pk):
        try:
            doctor = Doctor.objects.get(id=pk)
            doctor.delete()
            return Response(
                {"message": "doctor deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Doctor.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


class SpecializationFilter(APIView):
    def get(self, request, specialization):
        try:
            doctors = Doctor.objects.filter(
                Q(specialization__icontains=specialization)
                # | Q(other_specializations__icontains=specialization)
            )
            serializer = DoctorSerializer(doctors, many=True)

            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Doctor.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


# Medication


class MedicationList(APIView):
    def get(self, request):
        mediactions = Medication.objects.all()
        serializer = MedicationSerializer(mediactions, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = MedicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "HTTP_200_OK"}, status=status.HTTP_200_OK)
        return Response(
            serializer.errors,
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


class MedicationDetail(APIView):
    def get(self, request, pk):
        try:
            medication = Medication.objects.get(id=pk)
            serializer = MedicationSerializer(medication, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Medication.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, pk):
        try:
            medication = Medication.objects.get(id=pk)
            serializer = MedicationUpdateSerializer(
                instance=medication, data=request.data
            )
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY,
                )
        except Medication.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, pk):
        try:
            medication = Medication.objects.get(id=pk)
            medication.delete()
            return Response(
                {"message": "medication deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Medication.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


# Visit


class VisitList(APIView):
    def get(self, request):
        visits = Visit.objects.all()
        serializer = VisitSerializer(visits, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = VisitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "HTTP_200_OK"}, status=status.HTTP_200_OK)
        return Response(
            serializer.errors,
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


class VisitDetail(APIView):
    def get(self, request, pk):
        try:
            visit = Visit.objects.get(id=pk)
            serializer = VisitSerializer(visit, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Visit.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, pk):
        try:
            visit = Visit.objects.get(id=pk)
            serializer = VisitUpdateSerializer(instance=visit, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY,
                )
        except Visit.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, pk):
        try:
            visit = Visit.objects.get(id=pk)
            visit.delete()
            return Response(
                {"message": "visit deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Visit.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


class VisitListDoctor(APIView):
    def get(self, request, doctor_id):
        try:
            visits = Visit.objects.filter(doctor=doctor_id)
            serializer = VisitSerializer(visits, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)

        except Visit.DoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    @staticmethod
    def export_csv(request, doctor_id):
        visits = Visit.objects.filter(doctor=doctor_id)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="visits.csv"'

        writer = csv.writer(response)
        writer.writerow(['Data', 'Godzina', 'Osoba'])

        for visit in visits:
            writer.writerow(
                [visit.date, visit.time.strftime('%H:%M'), f'{visit.student.first_name} {visit.student.last_name}'])

        return response


class DocumentationList(APIView):
    def get(self, request):
        documentations = Documentation.objects.all()
        serializer = DocumentationGetSerializer(documentations, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = DocumentationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "HTTP_200_OK"},
                status=status.HTTP_200_OK
            )
        return Response(
            serializer.errors,
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


class DocumentationDetail(APIView):
    def get(self, request, student_id):
        try:
            documentation = Documentation.objects.get(student=student_id)
            serializer = DocumentationGetSerializer(documentation, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Documentation.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, student_id):
        try:
            documentation = Documentation.objects.get(student=student_id)
            serializer = DocumentationSerializer(instance=documentation, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY,
                )
        except Visit.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


class BookVisitAPIView(APIView):
    def post(self, request):
        data = request.data
        student = data.get('student')
        doctor = data.get('doctor')
        date_str = data.get('date')
        time_str = data.get('time')

        date = timezone.datetime.strptime(date_str, '%Y-%m-%d').date()
        time = timezone.datetime.strptime(time_str, '%H:%M').time()

        current_datetime = timezone.now()
        selected_datetime = timezone.make_aware(timezone.datetime.combine(date, time))
        if selected_datetime <= current_datetime:
            return Response(
                {"message": "Nie można zarejestrować się na wizytę z przeszłości"},
                status=status.HTTP_400_BAD_REQUEST)

        visit_exists = Visit.objects.filter(date=date, time=time).exists()
        if visit_exists:
            return Response(
                {"message": "Ten termin jest już zajęty"})

        visit_data = {
            'student': student,
            'doctor': doctor,
            'date': date,
            'time': time,
        }

        serializer = BookedVisitSerializer(data=visit_data)
        if serializer.is_valid():
            visit = serializer.save()
            visit.is_active = False
            visit.save()
            return Response(
                {"message": "Wizyta zarejestrowana"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApproveVisitAPIView(APIView):
    def post(self, request, pk):
        try:
            visit = Visit.objects.get(id=pk)
            visit.is_active = True
            visit.save()
            user = visit.student.user
            user_email = user.email
            doctor = visit.doctor.first_name + " " + visit.doctor.last_name

            send_mail(
                'Zatwierdzenie wizyty',
                f'Twoja wizyta na {visit.date} o godzinie {visit.time} u dr. {doctor} została zatwierdzona.',
                f'Curatio@gmail.com',
                [f'{user_email}'],
                fail_silently=False,
            )

            return Response(
                {"message": "Wizyta zatwierdzona"},
                status=status.HTTP_200_OK
            )
        except Visit.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


class RejectVisitApiView(APIView):
    def delete(self, request, pk):
        try:
            visit = Visit.objects.get(id=pk)

            if visit.is_active:
                return Response(
                    {"message": "Nie można usunąć aktywnej wizyty"}, status=status.HTTP_400_BAD_REQUEST)

            current_time = timezone.now()
            print(current_time)
            time_diff = visit.date - current_time.date()

            if time_diff.days <= 1 and visit.time.hour - current_time.hour <= 24:
                return Response(
                    {"message": "Nie można usunąć wizyty na 24h przed umówionym czasem"}, status=status.HTTP_400_BAD_REQUEST)

            visit.delete()
            user = visit.student.user
            user_email = user.email
            doctor = visit.doctor.first_name + " " + visit.doctor.last_name

            send_mail(
                'Odrzucenie wizyty',
                f'Twoja wizyta na {visit.date} o godzinie {visit.time} u dr. {doctor} została odrzucona.',
                f'Curatio@gmail.com',
                [f'{user_email}'],
                fail_silently=False,
            )
            return Response(
                {"message": "Wizyta odrzucona"}, status=status.HTTP_204_NO_CONTENT)

        except Visit.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


# PATIENT CARD

class PatientCardAPIView(APIView):
    def get(self, request, pk):
        student = Student.objects.get(id=pk)
        visits = Visit.objects.filter(Q(student=student) & Q(is_active=True)) 
        visit_info = VisitInfo.objects.filter(student=student).first()

        student_serializer = StudentPoorSerializer(student, many=False)
        visits_serializer = VisitPoorSerializer(visits, many=True)
        visit_info_serializer = VisitInfoSerializer(visit_info)

        data = {
            'student': student_serializer.data,
            'visits': visits_serializer.data,
            'visit_info': visit_info_serializer.data
        }

        combined_data = student_serializer.data
        combined_data['visits'] = visits_serializer.data
        combined_data['visit_info'] = visit_info_serializer.data

        return Response(
            combined_data
        )


class DoctorCardAPIView(APIView):
    def get(self, request, pk):
        doctor = Doctor.objects.get(id=pk)
        visits = Visit.objects.filter(Q(doctor=doctor) & Q(is_active=True))

        doctor_serializer = DoctorPoorSerializer(doctor, many=False)
        visits_serializer = VisitPoorSerializer(visits, many=True)

        data = {
            'doctor': doctor_serializer.data,
            'visits': []
        }

        for visit in visits:
            student_serializer = StudentPoorSerializer(visit.student)
            visit_data = {
                'id': visit.id,
                'date': visit.date,
                'time': visit.time,
                'student': student_serializer.data,
            }
            data['visits'].append(visit_data)

        return Response(data)


class VisitInfoAPIView(APIView):
    def get(self, request):
        visits = VisitInfo.objects.all()
        serializer = VisitInfoSerializer(visits, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
    
    def post(self, request):
        serializer = VisitInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(
            serializer.errors,
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


class VisitInfoDetailAPIView(APIView):
    def put(self, request, pk):
        try:
            visit_info = VisitInfo.objects.get(id=pk)
            serializer = VisitInfoUpdateSerializer(instance=visit_info, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            return Response(
                serializer.errors,
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )
        except VisitInfo.DoesNotExist:
            return Response(
                {"message": "visit info not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
