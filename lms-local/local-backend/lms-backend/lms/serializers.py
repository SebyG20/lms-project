from rest_framework import serializers
from .models import Course, Student

# Serializer for Course model
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['CourseID', 'Title', 'Description']

# Serializer for Student model
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['StudentID', 'Name', 'Email', 'Password', 'Role', 'Enrollments']
