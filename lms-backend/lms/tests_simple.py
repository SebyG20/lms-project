from django.test import TestCase
from django.urls import reverse
from lms.models import Student, Course

class SimpleStudentTest(TestCase):
    """
    Tests simple creation and API listing for Student model.
    """
    def test_create_student(self):
        """
        Test that a student can be created and fields are correct.
        Expected: Student with name 'A' and role 'student' is created.
        """
        s = Student.objects.create(Name='A', Email='a@a.com', Password='pw', Role='student')
        self.assertEqual(s.Name, 'A')
        self.assertEqual(s.Role, 'student')

    def test_student_list_api(self):
        """
        Test that the student list API returns created students.
        Expected: API response contains the name 'B'.
        """
        Student.objects.create(Name='B', Email='b@b.com', Password='pw', Role='student')
        url = reverse('student-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertIn('B', str(resp.content))

class SimpleCourseTest(TestCase):
    """
    Tests simple creation and API listing for Course model.
    """
    def test_create_course(self):
        """
        Test that a course can be created and fields are correct.
        Expected: Course with title 'Math' is created.
        """
        c = Course.objects.create(Title='Math', Description='Algebra')
        self.assertEqual(c.Title, 'Math')

    def test_course_list_api(self):
        """
        Test that the course list API returns created courses.
        Expected: API response contains the title 'Science'.
        """
        Course.objects.create(Title='Science', Description='Bio')
        url = reverse('course-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertIn('Science', str(resp.content))
