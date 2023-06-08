from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import *

urlpatterns = [
    path("register/", StudentRegister.as_view(), name="register-student"),
    path("login/", Login.as_view(), name="login"),
    path("token/access/", AccessToken.as_view(), name="access"),
    path("users/", UserList.as_view(), name="users"),
    path("users/<int:pk>/", UserDetail.as_view(), name="user"),
    path("students/", StudentList.as_view(), name="students"),
    path("students/<int:pk>/", StudentDetail.as_view(), name="student"),
    path("doctors/", DoctorList.as_view(), name="doctors"),
    path("doctors/<int:pk>/", DoctorDetail.as_view(), name="doctor"),
    path("doctors/<str:specialization>/", SpecializationFilter.as_view(), name="doctor-specialization"),
    path("receptions/", ReceptionList.as_view(), name="receptionists"),
    path("receptions/<int:pk>/", ReceptionDetail.as_view(), name="reception"),
    path("medications/", MedicationList.as_view(), name="medications"),
    path("medications/<int:pk>/", MedicationDetail.as_view(), name="medication"),
    path("visits/", VisitList.as_view(), name="visits"),
    path("visits/<int:pk>/", VisitDetail.as_view(), name="visit"),
    path("visits/doctor/<int:doctor_id>/", VisitListDoctor.as_view(), name="visits-doctor"),
    path("documentations/", DocumentationList.as_view(), name="documentations"),
    path("documentations/<int:student_id>/", DocumentationDetail.as_view(), name="documentation"),
    path("book-visit/", BookVisitAPIView.as_view(), name="book-visit")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
