from rest_framework import serializers
from .models import Course, Student

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['CourseID', 'Title', 'Description']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['StudentID', 'Name', 'Email', 'Password', 'Role', 'Enrollments']
