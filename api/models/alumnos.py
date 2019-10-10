from django.db import models
from .semestre import Semestre
from api.models import Carrera

class Alumno(models.Model):
    

    
    nombre = models.CharField(max_length=255)
    apellido = models.TextField(max_length=255)
    carnet = models.CharField(max_length=20)
    correo = models.EmailField()
    semestres = models.ManyToManyField(Semestre)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, related_name="alumnos")

    codigo_qr = models.FileField(upload_to='codigos/%Y/%m/%d', blank=True, null=True)
    activo = models.BooleanField(default=True)
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)



    def __str__(self):
        return self.nombre

    def __index_(self):
        return id