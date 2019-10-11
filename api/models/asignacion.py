from django.db import models
from .alumnos import Alumno
from .silla import Silla

class Asignacion(models.Model):

    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, related_name="asignaciones")
    silla = models.ForeignKey(Silla, on_delete=models.CASCADE, related_name="asignaciones")
   
    
    activo = models.BooleanField(default=True)
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    

    def __str__(self):
        return self.silla.fila_letra

    def __index_(self):
        return id