from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.decorators import action

from json import dumps


from api.models import Silla

from api.serializers import SillaSerializer


class SillasViewset(viewsets.ModelViewSet):
    queryset = Silla.objects.filter(activo=True)

    permission_classes = [AllowAny]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("no_lugar", "fila_letra")
    search_fields = ("no_lugar", "fila_letra")
    ordering_fields = ("no_lugar", "fila_letra")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return SillaSerializer
        else:
            return SillaSerializer

    @action(methods=["get"], detail=False)
    def get_lugares(self, request, *args, **kwargs):
        pivote = 64
        queryset = self.queryset
        data = []
        for x in range(1, 16):
            fila = queryset.filter(fila_letra=chr(pivote + x)).order_by('no_lugar')
            _serializer = SillaSerializer(fila, many=True)
            _data = {'letra': chr(pivote + x), 'codigo': pivote + x, 'data': _serializer.data}
            data.append(_data)

        
        return Response(data, status=status.HTTP_200_OK)

    