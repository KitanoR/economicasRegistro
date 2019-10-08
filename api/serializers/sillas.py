from rest_framework import serializers
from api.models import Silla


class SillaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Silla
        fields = (
            'id',
            'no_lugar',
            'fila_letra',
            'estado_lugar',
        )


