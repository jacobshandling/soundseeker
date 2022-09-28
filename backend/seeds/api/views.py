from rest_framework import viewsets
from rest_framework.parsers import FormParser, MultiPartParser

from ..models import AudioClip, Blob, Suite, User
from .serializers import (
    AudioClipSerializer,
    BlobSerializer,
    SuiteSerializer,
    UserSerializer,
)


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
