from rest_framework.views import APIView
# Login API for students
class StudentLoginAPIView(APIView):
	def post(self, request):
		email = request.data.get('Email')
		password = request.data.get('Password')
		try:
			student = Student.objects.get(Email=email)
			if student.Password == password:
				serializer = StudentSerializer(student)
				return Response(serializer.data, status=status.HTTP_200_OK)
			else:
				return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
		except Student.DoesNotExist:
			return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

from rest_framework.views import APIView
from django.shortcuts import render
from rest_framework import generics
from .models import Course, Student
from .serializers import CourseSerializer, StudentSerializer
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView
# API to list all students and get a single student
class StudentListAPIView(APIView):
	def get(self, request):
		students = Student.objects.all()
		serializer = StudentSerializer(students, many=True)
		return Response(serializer.data)

class StudentDetailAPIView(APIView):
	def get(self, request, student_id):
		try:
			student = Student.objects.get(StudentID=student_id)
		except Student.DoesNotExist:
			return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
		serializer = StudentSerializer(student)
		return Response(serializer.data)

class CourseListAPIView(generics.ListAPIView):
	queryset = Course.objects.all()
	serializer_class = CourseSerializer
	def get(self, request, *args, **kwargs):
		print('Django DB path:', settings.DATABASES['default']['NAME'])
		return super().get(request, *args, **kwargs)

class CourseDetailAPIView(generics.RetrieveAPIView):
	queryset = Course.objects.all()
	serializer_class = CourseSerializer
	lookup_field = 'CourseID'

# Registration API for new students

# Registration API for new students
class StudentRegisterAPIView(APIView):
	def post(self, request):
		email = request.data.get('Email')
		if Student.objects.filter(Email=email).exists():
			return Response({'Email': ['This email address is already in use.']}, status=status.HTTP_400_BAD_REQUEST)
		serializer = StudentSerializer(data=request.data)
		if serializer.is_valid():
			# Set role to student by default
			serializer.save(Role='student')
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API for updating and retrieving enrollments
class StudentEnrollmentsAPIView(APIView):
	def get(self, request, student_id):
		print(f"[DEBUG] GET enrollments for student_id={student_id}")
		try:
			student = Student.objects.get(StudentID=student_id)
		except Student.DoesNotExist:
			print(f"[DEBUG] Student {student_id} not found")
			return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
		print(f"[DEBUG] Enrollments for student {student_id}: {student.Enrollments}")
		return Response({'Enrollments': student.Enrollments})

	def post(self, request, student_id):
		print(f"[DEBUG] POST enrollments for student_id={student_id} with data={request.data}")
		try:
			student = Student.objects.get(StudentID=student_id)
		except Student.DoesNotExist:
			print(f"[DEBUG] Student {student_id} not found")
			return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
		enrollments = request.data.get('Enrollments', '')
		print(f"[DEBUG] Setting enrollments for student {student_id} to: {enrollments}")
		student.Enrollments = enrollments
		student.save()
		print(f"[DEBUG] Saved enrollments for student {student_id}: {student.Enrollments}")
		return Response({'Enrollments': student.Enrollments}, status=status.HTTP_200_OK)
