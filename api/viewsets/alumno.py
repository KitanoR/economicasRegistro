from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.db import transaction

from rest_framework import serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.decorators import action, permission_classes

from json import dumps


from api.models import Alumno, Silla, Semestre, Asignacion, Configuracion

from api.serializers import AlumnoSerializer, AlumnoReadSerializer


from io import BytesIO
from django.core.files import File
import qrcode


from api.utils.enviarcorreo import  sendEmailProveedor

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
            return AlumnoReadSerializer
        else:
            return AlumnoSerializer
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'leerQR':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        data = request.data
        
        with transaction.atomic():
            semestres = data.get('semestre', None)
            carrera = data.get('carrera', None)
            lugar = data.get('lugar', None)
            if lugar == None:
                raise serializers.ValidationError({'mensaje': 'Debe de seleccionar un lugar'})
            if semestres == None:
                raise serializers.ValidationError({'mensaje': 'Debe de seleccionar un semestre'})
            if carrera != None:
                data['carrera'] = carrera.get('id')
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            alumno = serializer.save()
            #Asignacion qr
            nombre_qr = "{}".format(alumno.carnet)
            qrcode_img = qrcode.make("{}".format(alumno.carnet))

            blob = BytesIO()
            qrcode_img.save(blob, 'JPEG')  
            alumno.codigo_qr.save('{}.jpg'.format(alumno.carnet), File(blob), save=False) 
            alumno.save()

            semestres = Semestre.objects.filter(id__in=semestres)
            for _semestre in semestres:
                alumno.semestres.add(_semestre)
            
            silla = Silla.objects.get(id=lugar)
            if silla.estado_lugar == Silla.OCUPADO or silla.estado_lugar == Silla.RESERVADO:
                raise serializers.ValidationError({'mensaje': 'Este lugar ya está ocupado.'})
            asignacion = Asignacion(
                alumno=alumno,
                silla_id=lugar
            ).save()
            silla.estado_lugar = Silla.OCUPADO
            silla.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

