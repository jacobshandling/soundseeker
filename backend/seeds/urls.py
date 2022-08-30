from django.urls import path, include

from rest_framework.routers import DefaultRouter

from seeds.views import index, register, UserViewSet, SuiteViewSet, BlobViewSet, AudioClipViewSet

router = DefaultRouter()
router.register(r'suites', SuiteViewSet)
router.register(r'users', UserViewSet)
router.register(r'blobs', BlobViewSet)
router.register(r'audioclips', AudioClipViewSet)

urlpatterns = [
    path("", index, name="index"),
    path("register", register, name="register"),
    path('accounts/', include('django.contrib.auth.urls')),

    # api v1
    path('api/v1/', include(router.urls)),
]
