
from django.db import models

# Course model: represents a course in the LMS
class Course(models.Model):
	CourseID = models.AutoField(primary_key=True, db_column='CourseID')  # Unique course ID
	Title = models.CharField(max_length=255, db_column='Title')  # Course title
	Description = models.TextField(db_column='Description', blank=True, null=True)  # Optional description

	class Meta:
		db_table = 'courses'
		managed = False  # Don't let Django manage the table (no migrations)

	def __str__(self):
		return self.Title

# Student model: persistent user accounts and enrollments
class Student(models.Model):
	StudentID = models.AutoField(primary_key=True)  # Unique student ID
	Name = models.CharField(max_length=255)  # Student name
	Email = models.EmailField(max_length=255, unique=True)  # Unique email
	Password = models.CharField(max_length=255)  # Hashed password
	Role = models.CharField(max_length=32, default='student')  # Role: student, teacher, admin
	Enrollments = models.CharField(max_length=1024, blank=True, default='')  # Comma-separated course IDs

	class Meta:
		db_table = 'students'
		managed = True  # Let Django manage this table

	def __str__(self):
		return self.Name
