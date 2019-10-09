from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.decorators import action

from json import dumps


from api.models import Alumno

from api.serializers import AlumnoSerializer


class AlumnoViewset(viewsets.ModelViewSet):
    queryset = Alumno.objects.filter(activo=True)

    permission_classes = [AllowAny]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "apellido", "carnet")
    search_fields = ("nombre", "apellido", "carnet")
    ordering_fields = ("nombre", "apellido", "carnet")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AlumnoSerializer
        else:
            return AlumnoSerializer

    

    