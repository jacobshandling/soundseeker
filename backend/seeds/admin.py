from django.contrib import admin

from .models import AudioClip, Blob, Suite, User

admin.site.register(User)
admin.site.register(AudioClip)
admin.site.register(Blob)
admin.site.register(Suite)
