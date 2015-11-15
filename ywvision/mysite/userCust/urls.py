from django.conf.urls import patterns, url, include
from rest_framework import routers
from userCust import views

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'checkmobile', views.CheckMobileViewSet)
router.register(r'users', views.UserViewSet)




urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
)