"""
URL configuration for lms_backend project.

This file maps URL patterns to views for the LMS backend API and admin panel.
See Django docs for details: https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path
from lms.views import CourseListAPIView, CourseDetailAPIView, StudentRegisterAPIView, StudentEnrollmentsAPIView, StudentListAPIView, StudentDetailAPIView, StudentLoginAPIView, CourseUpdateAPIView, CourseCreateAPIView, CourseDeleteAPIView, CourseEnrollmentsAPIView, health_check

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health-check'),
    path('api/courses/', CourseListAPIView.as_view(), name='course-list'),
    path('api/courses/<int:CourseID>/', CourseDetailAPIView.as_view(), name='course-detail'),
    path('api/courses/<int:CourseID>/edit/', CourseUpdateAPIView.as_view(), name='course-update'),
    path('api/courses/<int:CourseID>/delete/', CourseDeleteAPIView.as_view(), name='course-delete'),
    path('api/courses/create/', CourseCreateAPIView.as_view(), name='course-create'),
    path('api/register/', StudentRegisterAPIView.as_view(), name='student-register'),
    path('api/students/<int:student_id>/enrollments/', StudentEnrollmentsAPIView.as_view(), name='student-enrollments'),
    path('api/students/', StudentListAPIView.as_view(), name='student-list'),
    path('api/students/<int:student_id>/', StudentDetailAPIView.as_view(), name='student-detail'),
    path('api/login/', StudentLoginAPIView.as_view(), name='student-login'),
    path('api/courses/<int:course_id>/enrollments/', CourseEnrollmentsAPIView.as_view(), name='course-enrollments'),
]
