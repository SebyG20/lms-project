"""
ASGI config for lms_backend project.

This file exposes the ASGI callable for async deployment and running the Django app.
See Django docs: https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_backend.settings')

application = get_asgi_application()
