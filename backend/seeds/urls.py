from django.urls import path, include

from rest_framework.routers import DefaultRouter

from seeds import views

router = DefaultRouter()
router.register(r'suites', views.SuiteViewSet)
router.register(r'users', views.UserViewSet)




urlpatterns = [
    path("", views.index, name="index"),
    path('api/', include(router.urls))
]