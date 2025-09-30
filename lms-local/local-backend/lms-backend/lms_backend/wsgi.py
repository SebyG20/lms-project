"""
WSGI config for lms_backend project.

This file exposes the WSGI callable for deployment and running the Django app.
See Django docs: https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_backend.settings')

application = get_wsgi_application()
