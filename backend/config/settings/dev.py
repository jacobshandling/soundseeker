"""
local development-specific settings
"""

import os
from pathlib import Path

from .base import *


BASE_DIR = Path(__file__).resolve().parent.parent.parent

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1"]

STATIC_ROOT = os.path.join(os.path.join(BASE_DIR, "seeds"), "static")
STATIC_URL = "/static/"

MEDIA_ROOT = os.path.join(os.path.join(BASE_DIR, "seeds"), "media")
MEDIA_URL = "/media/"


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.environ.get("PG_DB_NAME"),
        "USER": os.environ.get("PG_DB_USER"),
        "PASSWORD": os.environ.get("PG_DB_PW"),
        "HOST": "localhost",
        "PORT": "",
    }
}
