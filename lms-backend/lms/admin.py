from django.contrib import admin
from .models import Course, Student

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
	list_display = ('CourseID', 'Title', 'Description')

# Register Student model for admin panel
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
	list_display = ('StudentID', 'Name', 'Email', 'Password', 'Role', 'get_enrollment_names')

	def get_enrollment_names(self, obj):
		if not obj.Enrollments:
			return "-"
		ids = [id.strip() for id in obj.Enrollments.split(',') if id.strip()]
		courses = Course.objects.filter(CourseID__in=ids)
		return ", ".join(course.Title for course in courses) if courses else "-"
	get_enrollment_names.short_description = 'Enrollments'
