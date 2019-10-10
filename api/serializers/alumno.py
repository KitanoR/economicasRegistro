from rest_framework import serializers
from api.models import Alumno, Semestre, Carrera


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


class SemestreSerializer(serializers.ModelSerializer):
    label = serializers.ReadOnlyField(source="nombre")
    value = serializers.ReadOnlyField(source="id")
    class Meta:
        model = Semestre
        fields = [
            'id',
            'nombre',
            'label',
            'value'
        ]
class CarreraSerializer(serializers.ModelSerializer):
    label = serializers.ReadOnlyField(source="nombre")
    value = serializers.ReadOnlyField(source="id")
    class Meta:
        model = Carrera
        fields = [
            'id',
            'nombre',
            'label',
            'value'
        ]