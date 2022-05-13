"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

# WHEREAMI = os.environ.get('WHEREAMI')
# if WHEREAMI and WHEREAMI.lower() == 'dev':
#     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# else:
#     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.heroku_settings')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
application = get_wsgi_application()
