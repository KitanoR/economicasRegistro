from django.db import models

class Silla(models.Model):

    OCUPADO = 3
    DISPONIBLE = 1

    ESTADO_SILLA = (
        (OCUPADO, 'Ocupado'),
        (DISPONIBLE, 'Disponible'),
    )


    no_lugar = models.SmallIntegerField()
    fila_letra = models.CharField(max_length=3)
    estado_lugar = models.SmallIntegerField(choices=ESTADO_SILLA, default=DISPONIBLE)

    
    activo = models.BooleanField(default=True)
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)


    def __str__(self):
        return "{} {}".format(self.fila_letra, self.no_lugar)

    def __index_(self):
        return id