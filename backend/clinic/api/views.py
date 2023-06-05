from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView, status

from .models import Student, User, Reception
from .serializers import (
    StudentCreateSerializer,
    StudentUpdateSerializer,
    StudentSerializer,
    UserSerializer,
    UserUpdateSerializer,
    ReceptionSerializer,
    ReceptionCreateSerializer,
    ReceptionUpdateSerializer,
)


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
            serializer = ReceptionUpdateSerializer(instance=reception, data=request.data)
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
                {"message": "student deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Reception.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )
