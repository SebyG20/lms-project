
from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom user model for Cyber College
# Adds a 'role' field to distinguish between admin, teacher, and student users
class CustomUser(AbstractUser):
	ROLE_CHOICES = [
		('admin', 'Admin'),
		('teacher', 'Teacher'),
		('student', 'Student'),
	]
	# Role determines the user's permissions in the system
	role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

	def is_admin(self):
		return self.role == 'admin'

	def is_teacher(self):
		return self.role == 'teacher'

	def is_student(self):
		return self.role == 'student'

	# You can add more fields (e.g., bio, profile_pic) as needed
