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
            return Response(status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)