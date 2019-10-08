from django.db import models
from .semestre import Semestre

class Alumno(models.Model):

    nombre = models.CharField(max_length=255)
    apellido = models.TextField(max_length=255)
    correo = models.EmailField()

    semestres = models.ManyToManyField(Semestre)


    activo = models.BooleanField(default=True)
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)



    def __str__(self):
        return self.name

    def __index_(self):
        return id