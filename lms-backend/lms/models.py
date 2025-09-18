
from django.db import models

class Course(models.Model):
	CourseID = models.AutoField(primary_key=True, db_column='CourseID')
	Title = models.CharField(max_length=255, db_column='Title')
	Description = models.TextField(db_column='Description', blank=True, null=True)

	class Meta:
		db_table = 'courses'
		managed = False  # Don't let Django manage the table (no migrations)

	def __str__(self):
		return self.Title

# Student model for persistent user accounts and enrollments
class Student(models.Model):
	StudentID = models.AutoField(primary_key=True)
	Name = models.CharField(max_length=255)
	Email = models.EmailField(max_length=255, unique=True)
	Password = models.CharField(max_length=255)
	Role = models.CharField(max_length=32, default='student')
	# Store enrolled course IDs as a comma-separated string for simplicity
	Enrollments = models.CharField(max_length=1024, blank=True, default='')

	class Meta:
		db_table = 'students'
		managed = True  # Let Django manage this table

	def __str__(self):
		return self.Name
