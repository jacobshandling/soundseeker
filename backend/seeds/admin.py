from django.contrib import admin
from .models import User, AudioClip, Blob, Suite, Label

admin.site.register(User)
admin.site.register(AudioClip)
admin.site.register(Blob)
admin.site.register(Suite)
admin.site.register(Label)