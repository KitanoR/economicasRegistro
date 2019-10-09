from rest_framework import serializers
from api.models import Alumno


class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = (
            'id',
            'nombre',
            'apellido',
            'carnet',
            'correo',
            'semestres',
            'codigo_qr',
        )


