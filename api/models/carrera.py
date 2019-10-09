from django.db import models

class Carrera(models.Model):

    nombre = models.CharField(max_length=50)
    
    activo = models.BooleanField(default=True)
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

  
    def __str__(self):
        return self.nombre

    def __index_(self):
        return id