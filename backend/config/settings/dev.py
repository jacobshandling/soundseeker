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
        "NAME": "jake_21",
        "USER": "jake_21",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": "",
    }
}
