from django.urls import path

from .views import StudentDetail, StudentList, UserDetail, UserList, ReceptionList, ReceptionDetail

urlpatterns = [
    path("users/", UserList.as_view(), name="users"),
    path("user/<int:pk>", UserDetail.as_view(), name="user"),
    path("students/", StudentList.as_view(), name="students"),
    path("student/<int:pk>", StudentDetail.as_view(), name="student"),
    path("receptionists/", ReceptionList.as_view(), name="receptionists"),
    path("reception/<int:pk>", ReceptionDetail.as_view(), name="reception"),
]
