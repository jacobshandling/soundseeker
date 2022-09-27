"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.2.10.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os
from pathlib import Path

import dj_database_url
import psycopg2

from .base import *

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


DEBUG = False

SITE_DOMAIN = "www.soundseeker.app"
ALLOWED_HOSTS = ["sound-seeker.herokuapp.com", "www.soundseeker.app"]

# HTTPS settings - https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/#s-https
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

MIDDLEWARE += [
    # custom middleware to enforce client uses settings.SITE_DOMAIN
    # see https://stackoverflow.com/questions/44743336/how-do-i-automatically-redirect-a-heroku-app-url-to-my-custom-domain-with-django
    "seeds.middleware.CanonicalDomainMiddleware.CanonicalDomainMiddleware",
]

# s3 settings
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
AWS_DEFAULT_ACL = "public-read"
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
# s3 static settings
AWS_LOCATION = "static"
STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/"
STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
# s3 public media settings
PUBLIC_MEDIA_LOCATION = "media"
MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/"
DEFAULT_FILE_STORAGE = "config.storage_backends.PublicMediaStorage"
# s3 private media settings
PRIVATE_MEDIA_LOCATION = "private"
PRIVATE_FILE_STORAGE = "config.storage_backends.PrivateMediaStorage"

# Extra places for collectstatic to find static files
# STATICFILES_DIRS = (os.path.join(BASE_DIR, "static"),)


DATABASES = {
    "default": dj_database_url.config(conn_max_age=600, ssl_require=True)
}
