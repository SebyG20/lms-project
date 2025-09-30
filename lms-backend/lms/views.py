
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Course, Student
from .serializers import CourseSerializer, StudentSerializer
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

# Health check endpoint
@api_view(['GET'])
def health_check(request):
    return Response({"status": "ok"})

# Minimal API views for courses and students
from rest_framework import generics


class CourseListAPIView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# Student list API view
class StudentListAPIView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

# Login API view
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
class StudentLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('Email')
        password = request.data.get('Password')
        try:
            student = Student.objects.get(Email=email)
            if student.Password == password:
                # Return minimal user info (customize as needed)
                return Response({
                    'StudentID': student.StudentID,
                    'Name': student.Name,
                    'Email': student.Email,
                    'Role': student.Role
                })
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Student.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

