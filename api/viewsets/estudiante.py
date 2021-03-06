#!/usr/bin/python3.6
# /usr/bin/python3.6 is the only line of code I changed to fix the crash
# -*- coding: utf-8 -*-

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.db import transaction

from rest_framework import serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.decorators import action, permission_classes

from json import dumps

from api.models import (
    Alumno,
    Silla,
    Semestre,
    Asignacion,
    Configuracion
)
from api.serializers import (
    AlumnoReadSerializer,
    AlumnoSerializer
)

from io import BytesIO
from django.core.files import File
import qrcode

from api.utils.enviarcorreo import sendEmailProveedor

class EstudianteViewSet(viewsets.ModelViewSet):
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
        try:
            with transaction.atomic():
                semestres = data.get('semestres', None)
                carrera = data.get('carrera', None)
                lugar = data.get('lugar', None)
               
                if semestres == None:
                    raise serializers.ValidationError({'detail': ' Debe de seleccionar al menos un semestre'})
                if carrera != None:
                    data['carrera'] = carrera.get('id')
                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                alumno = serializer.save()

                nombre_qr = "{}".format(alumno.carnet)
                qrcode_img = qrcode.make("{}".format(alumno.carnet))

                blob = BytesIO()
                qrcode_img.save(blob, 'JPEG')
                alumno.codigo_qr.save('{}.jpg'.format(alumno.carnet), File(blob), save=False)
                alumno.save()

                semestres = Semestre.objects.filter(id__in=semestres)
                for _semestre in semestres:
                    alumno.semestres.add(_semestre)
                
                silla = None
                if lugar:
                    silla = Silla.objects.get(id=lugar)
                    if silla.estado_lugar == silla.OCUPADO or silla.estado_lugar == Silla.RESERVADO:
                        raise serializers.ValidationError({'detail': 'Este lugar ya está ocupado'})
                    asignacion = Asignacion(
                        alumno=alumno,
                        silla_id=lugar
                    ).save()
                    silla.estado_lugar = Silla.OCUPADO
                    silla.save()
                codigo = str(alumno.codigo_qr.url)
                orden_correo = {
                    'silla': 'No asignado',
                    'usuario': alumno.nombre,
                    'no_orden': alumno.carnet,
                    'fecha': '',
                    'monto': 100.00
                }

                if lugar and silla:
                    orden_correo['silla'] : '{}-{}'.format(silla.fila_letra, silla.no_lugar)
                sendEmailProveedor(orden_correo, alumno.correo, codigo_qr=codigo)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        data = request.data
        semestres = data.get('semestres', None)

        try:
            with transaction.atomic():
                alumno = self.get_object()
                serializer = AlumnoSerializer(alumno, data=data, partial=True)
                serializer.is_valid(raise_exception=True)
                alumno = serializer.save()

                semestres_borrados = alumno.semestres.exclude(id__in=semestres)
                for _semestre in semestres_borrados:
                    alumno.semestres.remove(_semestre)
                alumno.save()

                semestres = Semestre.objects.filter(id__in=semestres)
                for _semestre in semestres:
                    alumno.semestres.add(_semestre)

                nombre_qr = "{}".format(alumno.carnet)
                qrcode_img = qrcode.make("{}".format(alumno.carnet))

                blob = BytesIO()
                qrcode_img.save(blob, 'JPEG')
                alumno.codigo_qr.save('{}.jpg'.format(alumno.carnet), File(blob), save=False)
                alumno.save()
                codigo = str(alumno.codigo_qr.url)
                orden_correo = {
                    'silla': 'No asignado',
                    'usuario': alumno.nombre,
                    'no_orden': alumno.carnet,
                    'fecha': '',
                    'monto': 100.00
                }

                if alumno.asignaciones.first():
                    asignacion = alumno.asignaciones.first()
                    silla = asignacion.silla
                    orden_correo['silla'] : '{}-{}'.format(silla.fila_letra, silla.no_lugar)
                sendEmailProveedor(orden_correo, alumno.correo, codigo_qr=codigo)

                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def leerQR(self, request, *args, **kwargs):
        data = request.data
        carnet = data['carnet']
        conf = Configuracion.objects.first()
        alumno = Alumno.objects.filter(carnet=carnet).first()
        if alumno:
            if alumno.cantidad_verificacion < conf.cantidad_qr:
                cantidad = alumno.cantidad_verificacion + 1
                alumno.cantidad_verificacion = cantidad
                alumno.save()

                mensaje = "{}, ha marcado la entrada al evento.".format(alumno.nombre)

                if alumno.asignaciones.first():
                    asignacion = alumno.asignaciones.first()
                    mensaje = "{}, ha marcado la entrada al evento. Lugar {}-{}".format(
                        alumno.nombre,
                        asignacion.silla.fila_letra,
                        asignacion.silla.no_lugar
                    )
                if cantidad == 2:
                    mensaje = "{}, ha marcado el consumo de coffe break.".format(alumno.nombre)

                return Response({'detail':mensaje}, status=status.HTTP_200_OK)
            else:
                raise serializers.ValidationError({'detail': 'El código ya no es válido.'})
        else:
            raise serializers.ValidationError({'detail':'No existe el carnet.'})