from django.db import models
from .alumnos import Alumno
from .silla import Silla

class Configuracion(models.Model):

    cantidad_qr = models.SmallIntegerField(default=1)
    activo = models.BooleanField(default=True)
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    

    def __str__(self):
        return str(self.cantidad_qr)

  