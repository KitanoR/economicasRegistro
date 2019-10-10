from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.decorators import action

from json import dumps


from api.models import Carrera

from api.serializers import CarreraSerializer


class CarreraViewset(viewsets.ModelViewSet):
    queryset = Carrera.objects.filter(activo=True)

    permission_classes = [AllowAny]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "id", )
    search_fields = ("nombre", "id", )
    ordering_fields = ("nombre", "id", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CarreraSerializer
        else:
            return CarreraSerializer

    

    