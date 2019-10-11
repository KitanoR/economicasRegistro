from rest_framework import serializers
from api.models import Alumno, Semestre, Carrera, Asignacion


class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = (
            'id',
            'nombre',
            'apellido',
            'carnet',
            'correo',
            'carrera'
        )

class AsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignacion
        fields = (
            'id',
            'silla'
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

class AlumnoReadSerializer(serializers.ModelSerializer):
    carrera = CarreraSerializer(read_only=True)
    semestres = SemestreSerializer(read_only=True, many=True)
    asignacion = serializers.SerializerMethodField()
    class Meta:
        model = Alumno
        fields = (
            'id',
            'nombre',
            'apellido',
            'carnet',
            'correo',
            'carrera',
            'semestres',
            'asignacion'
        )
    
    def get_asignacion(self, alumno):
        lugar = alumno.asignaciones.first()
        if lugar:
            return "{}-{}".format(lugar.silla.fila_letra, lugar.silla.no_lugar)
        return None