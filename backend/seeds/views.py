from typing import *
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from rest_framework import viewsets, permissions
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response

from rest_framework.parsers import FormParser, MultiPartParser

from .serializers import *
from .models import *

@ensure_csrf_cookie
def index(request):
    return render(request, 'seeds/index.html')

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "registration/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "registration/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "registration/register.html")



# API Views

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    Automatically provides 'list' and 'retrieve' actions
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SuiteViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = Suite.objects.all()
    serializer_class = SuiteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class BlobViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = Blob.objects.all()
    serializer_class = BlobSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AudioClipViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = AudioClip.objects.all()
    serializer_class = AudioClipSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class LabelViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = Label.objects.all()
    serializer_class = LabelSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)