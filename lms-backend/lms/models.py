
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
