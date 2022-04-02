from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models
# from django.db.models.fields import CharField

class User(AbstractUser):

    def __str__(self):
        return f'{self.username}'

class AudioClip(models.Model):
    name = models.CharField(max_length=64, blank=True)
    # https://docs.djangoproject.com/en/3.2/topics/files/
    file = models.FileField(upload_to="")
    # TODO: make sure file referencing / storage / serving works properly
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_clips")

    def __str__(self):
        return f"AudioClip '{self.name}'"

class Blob(models.Model):
    name = models.CharField(max_length=64)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_blobs")
    clips = models.ManyToManyField(AudioClip, blank=True, related_name='blobs')

    def __str__(self):
        return f"Blob '{self.name}'"

class Suite(models.Model):
    name = models.CharField(max_length=64)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_suites")
    blobs = models.ManyToManyField(Blob, blank=True, related_name="suites")

    def __str__(self):
        return f"Suite '{self.name}'"

class Label(models.Model):
    name = models.CharField(max_length=64)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_labels")
    clips = models.ManyToManyField(AudioClip, blank=True, related_name="labels")
    blobs = models.ManyToManyField(Blob, blank=True, related_name="labels")
    suites = models.ManyToManyField(Suite, blank=True, related_name="labels")

    def __str__(self):
        return f"Label '{self.name}'"




