from django.test import TestCase
from django.urls import reverse
from lms.models import Student

class StudentModelTest(TestCase):
    """
    Tests creation of a Student model instance and verifies its fields.
    Expected: The created student has the correct name, email, and role.
    """
    def setUp(self):
        self.student = Student.objects.create(Name='Test User', Email='test@example.com', Password='testpass', Role='student')

    def test_student_creation(self):
        self.assertEqual(self.student.Name, 'Test User')
        self.assertEqual(self.student.Email, 'test@example.com')
        self.assertEqual(self.student.Role, 'student')

class StudentListViewTest(TestCase):
    """
    Tests that the student list API returns all created students.
    Expected: The API response contains the names of all students created in setUp.
    """
    def setUp(self):
        Student.objects.create(Name='User1', Email='user1@example.com', Password='pass1', Role='student')
        Student.objects.create(Name='User2', Email='user2@example.com', Password='pass2', Role='teacher')

    def test_students_listed(self):
        response = self.client.get(reverse('student-list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'User1')
        self.assertContains(response, 'User2')
