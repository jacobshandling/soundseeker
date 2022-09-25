from django.contrib.auth import login
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import viewsets
from rest_framework.parsers import FormParser, MultiPartParser

from .models import AudioClip, Blob, Suite, User
from .serializers import (
    AudioClipSerializer,
    BlobSerializer,
    SuiteSerializer,
    UserSerializer,
)


@ensure_csrf_cookie
def index(request):
    return render(request, "seeds/index.html")


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(
                request,
                "registration/register.html",
                {"message": "Passwords must match."},
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            # TODO: modify below to work with REST / frontend setup
            return render(
                request,
                "registration/register.html",
                {"message": "Username already taken."},
            )
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "registration/register.html")


# API v1 Views


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Automatically provides 'list' and 'retrieve' actions
    """

    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


class SuiteViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """

    serializer_class = SuiteSerializer

    def get_queryset(self):
        return Suite.objects.filter(owner=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BlobViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """

    serializer_class = BlobSerializer

    def get_queryset(self):
        return Blob.objects.filter(owner=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AudioClipViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """

    serializer_class = AudioClipSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return AudioClip.objects.filter(owner=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
