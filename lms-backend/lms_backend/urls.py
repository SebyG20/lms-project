"""
URL configuration for lms_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from lms.views import CourseListAPIView
from lms.views import CourseListAPIView, CourseDetailAPIView, StudentRegisterAPIView, StudentEnrollmentsAPIView, StudentListAPIView, StudentDetailAPIView, StudentLoginAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/courses/', CourseListAPIView.as_view(), name='course-list'),
    path('api/courses/<int:CourseID>/', CourseDetailAPIView.as_view(), name='course-detail'),
    path('api/register/', StudentRegisterAPIView.as_view(), name='student-register'),
    path('api/students/<int:student_id>/enrollments/', StudentEnrollmentsAPIView.as_view(), name='student-enrollments'),
    path('api/students/', StudentListAPIView.as_view(), name='student-list'),
    path('api/students/<int:student_id>/', StudentDetailAPIView.as_view(), name='student-detail'),
    path('api/login/', StudentLoginAPIView.as_view(), name='student-login'),
]
