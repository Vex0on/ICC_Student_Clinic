from django.urls import path

from .views import *

urlpatterns = [
    path("users/", UserList.as_view(), name="users"),
    path("user/<int:pk>", UserDetail.as_view(), name="user"),
    path("students/", StudentList.as_view(), name="students"),
    path("student/<int:pk>", StudentDetail.as_view(), name="student"),
    path("doctors/", DoctorList.as_view(), name="doctors"),
    path("doctors/<int:pk>/", DoctorDetail.as_view(), name="doctor"),
    path("medications/", MedicationList.as_view(), name="medications"),
    path("medications/<int:pk>/", MedicationDetail.as_view(), name="medication"),
    path("use-medications/", UseMedicationList.as_view(), name="use-medications"),
    path("use-medications/<int:pk>/", UseMedicationDetail.as_view(), name="use-medication"),
    path("prescriptions/", PrescriptionList.as_view(), name="prescriptions"),
    path("prescriptions/<int:pk>/", PrescriptionDetail.as_view(), name="prescription"),
    path("visits/", VisitList.as_view(), name="visits"),
    path("visits/<int:pk>/", VisitDetail.as_view(), name="visit"),
    path("token/access/", AccessToken.as_view(), name="access"),
]
