from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
	list_display = ("title", "instructor", "start_date", "end_date", "created_at")
