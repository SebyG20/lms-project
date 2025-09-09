
from django.db import models

class Course(models.Model):
	"""
	Represents a course in the LMS.
	"""
	title = models.CharField(max_length=200)
	description = models.TextField()
	instructor = models.CharField(max_length=100)
	start_date = models.DateField()
	end_date = models.DateField()
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title
