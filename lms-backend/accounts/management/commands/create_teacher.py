from django.core.management.base import BaseCommand
from accounts.models import CustomUser

class Command(BaseCommand):
    help = 'Create a default teacher account'

    def handle(self, *args, **kwargs):
        username = 'teacher1'
        email = 'teacher1@cybercollege.com'
        password = 'changeme123'  # You should change this after first login
        if not CustomUser.objects.filter(username=username).exists():
            CustomUser.objects.create_user(username=username, email=email, password=password, role='teacher')
            self.stdout.write(self.style.SUCCESS(f'Teacher account created: {username} / {password}'))
        else:
            self.stdout.write(self.style.WARNING('Teacher account already exists.'))
