from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Course, Student

# tests.py
# This file contains unit tests for the LMS Django app.
# Add test cases for models, views, and API endpoints here.

class CourseApiTests(APITestCase):
    def setUp(self):
        self.teacher = Student.objects.create(Name='Teacher', Email='teacher@example.com', Password='pass', Role='teacher')
        self.course = Course.objects.create(Title='Test Course', Description='Test Desc')


    # Test: Retrieve the list of courses
    # Expected: Status 200 OK, response contains the test course title
    def test_course_list(self):
        url = reverse('course-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Test Course', str(response.data))


    # Test: Create a new course
    # Expected: Status 201 CREATED, response contains the new course title
    def test_course_create(self):
        url = reverse('course-create')
        data = {'Title': 'New Course', 'Description': 'Desc', 'TeacherID': self.teacher.StudentID}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['Title'], 'New Course')


    # Test: Delete an existing course
    # Expected: Status 204 NO CONTENT (course deleted)
    def test_course_delete(self):
        url = reverse('course-delete', args=[self.course.CourseID])
        data = {'TeacherID': self.teacher.StudentID}
        response = self.client.delete(url, data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class StudentApiTests(APITestCase):
    def setUp(self):
        self.student = Student.objects.create(Name='Student', Email='student@example.com', Password='pass', Role='student')


    # Test: Register a new student
    # Expected: Status 201 CREATED, response contains the new student's email
    def test_student_register(self):
        url = reverse('student-register')
        data = {'Name': 'New Student', 'Email': 'newstudent@example.com', 'Password': 'pass'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['Email'], 'newstudent@example.com')


    # Test: Login with an existing student
    # Expected: Status 200 OK, response contains the student's email
    def test_student_login(self):
        url = reverse('student-login')
        data = {'Email': self.student.Email, 'Password': 'pass'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['Email'], self.student.Email)
