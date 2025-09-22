from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Course, Student
from .serializers import CourseSerializer, StudentSerializer
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

# API to get all students enrolled in a specific course
class CourseEnrollmentsAPIView(APIView):
	def get(self, request, course_id):
		# Find all students whose Enrollments field contains this course_id
		enrolled_students = []
		for student in Student.objects.all():
			enrolled_ids = [id.strip() for id in (student.Enrollments or '').split(',') if id.strip()]
			if str(course_id) in enrolled_ids:
				enrolled_students.append(student)
		serializer = StudentSerializer(enrolled_students, many=True)
		return Response({'students': serializer.data})

# API for teachers to delete course
class CourseDeleteAPIView(APIView):
	def delete(self, request, CourseID):
		teacher_id = request.data.get('TeacherID')
		if not teacher_id:
			return Response({'error': 'TeacherID required'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			teacher = Student.objects.get(StudentID=teacher_id)
		except Student.DoesNotExist:
			return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
		if teacher.Role not in ['teacher', 'admin']:
			return Response({'error': 'Only teachers or admins can delete courses'}, status=status.HTTP_403_FORBIDDEN)
		try:
			course = Course.objects.get(CourseID=CourseID)
		except Course.DoesNotExist:
			return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
		course.delete()
		return Response({'success': True}, status=status.HTTP_204_NO_CONTENT)
from rest_framework.views import APIView
# API for teachers to create course
class CourseCreateAPIView(APIView):
	def post(self, request):
		teacher_id = request.data.get('TeacherID')
		if not teacher_id:
			return Response({'error': 'TeacherID required'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			teacher = Student.objects.get(StudentID=teacher_id)
		except Student.DoesNotExist:
			return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
		if teacher.Role not in ['teacher', 'admin']:
			return Response({'error': 'Only teachers or admins can create courses'}, status=status.HTTP_403_FORBIDDEN)
		title = request.data.get('Title')
		description = request.data.get('Description', '')
		if not title:
			return Response({'error': 'Title required'}, status=status.HTTP_400_BAD_REQUEST)
		course = Course(Title=title, Description=description)
		course.save()
		return Response(CourseSerializer(course).data, status=status.HTTP_201_CREATED)
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.views import APIView
from .models import Course, Student
from .serializers import CourseSerializer
from rest_framework.response import Response
from rest_framework import status

# API for teachers to update course
class CourseUpdateAPIView(APIView):
	def put(self, request, CourseID):
		# Only allow teachers to update
		teacher_id = request.data.get('TeacherID')
		if not teacher_id:
			return Response({'error': 'TeacherID required'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			teacher = Student.objects.get(StudentID=teacher_id)
		except Student.DoesNotExist:
			return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
		if teacher.Role not in ['teacher', 'admin']:
			return Response({'error': 'Only teachers or admins can edit courses'}, status=status.HTTP_403_FORBIDDEN)
		try:
			course = Course.objects.get(CourseID=CourseID)
		except Course.DoesNotExist:
			return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
		title = request.data.get('Title')
		description = request.data.get('Description')
		if title:
			course.Title = title
		if description is not None:
			course.Description = description
		course.save()
		return Response(CourseSerializer(course).data, status=status.HTTP_200_OK)
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
	def delete(self, request, student_id):
		try:
			student = Student.objects.get(StudentID=student_id)
		except Student.DoesNotExist:
			return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
		student.delete()
		return Response({'success': True}, status=status.HTTP_204_NO_CONTENT)
	def get(self, request, student_id):
		try:
			student = Student.objects.get(StudentID=student_id)
		except Student.DoesNotExist:
			return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
		serializer = StudentSerializer(student)
		return Response(serializer.data)

	def put(self, request, student_id):
		try:
			student = Student.objects.get(StudentID=student_id)
		except Student.DoesNotExist:
			return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
		serializer = StudentSerializer(student, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def patch(self, request, student_id):
		try:
			student = Student.objects.get(StudentID=student_id)
		except Student.DoesNotExist:
			return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
		serializer = StudentSerializer(student, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
			# Accept role from request, default to student
			role = request.data.get('Role', 'student')
			serializer.save(Role=role)
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
