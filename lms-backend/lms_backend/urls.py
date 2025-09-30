"""
URL configuration for lms_backend project.

This file maps URL patterns to views for the LMS backend API and admin panel.
See Django docs for details: https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path
from lms.views import health_check, CourseListAPIView, StudentListAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health-check'),
    path('api/courses/', CourseListAPIView.as_view(), name='course-list'),
    path('api/students/', StudentListAPIView.as_view(), name='student-list'),
]
