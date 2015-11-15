from userCust.models import MyUser
from rest_framework import routers, serializers, viewsets, permissions
from userCust.serializers import UserSerializer, CheckMobileSerializer
from rest_framework import filters


# ViewSets define the view behavior.

#this is the overall userset which should only be allowed to site administators!
class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all().order_by('-id')
    serializer_class = UserSerializer
    #permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('username', )


#check mobile in database
class CheckMobileViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all().order_by('-id')
    serializer_class = CheckMobileSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('username', )