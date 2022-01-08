from django.urls import path, include

from rest_framework.routers import DefaultRouter

from seeds.views import *

router = DefaultRouter()
router.register(r'suites', SuiteViewSet)
router.register(r'users', UserViewSet)
router.register(r'blobs', BlobViewSet)
router.register(r'audioclips', AudioClipViewSet)
router.register(r'labels', LabelViewSet)




urlpatterns = [
    path("", index, name="index"),
    path('api/', include(router.urls))
]