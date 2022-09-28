from django.urls import include, path
from rest_framework.routers import DefaultRouter

from seeds.api.views import AudioClipViewSet, BlobViewSet, SuiteViewSet, UserViewSet
from seeds.views import index, register

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="User")
router.register(r"suites", SuiteViewSet, basename="Suite")
router.register(r"blobs", BlobViewSet, basename="Blob")
router.register(r"audioclips", AudioClipViewSet, basename="AudioClip")

urlpatterns = [
    path("", index, name="index"),
    path("register", register, name="register"),
    path("accounts/", include("django.contrib.auth.urls")),
    # api
    path("api/v1/", include(router.urls)),
]
