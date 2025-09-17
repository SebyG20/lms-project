from django.shortcuts import render



from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer

from django.conf import settings

class CourseListAPIView(generics.ListAPIView):
	queryset = Course.objects.all()
	serializer_class = CourseSerializer

	def get(self, request, *args, **kwargs):
		print('Django DB path:', settings.DATABASES['default']['NAME'])
		return super().get(request, *args, **kwargs)
        
class CourseDetailAPIView(generics.RetrieveAPIView):
	queryset = Course.objects.all()
	serializer_class = CourseSerializer
	lookup_field = 'CourseID'
