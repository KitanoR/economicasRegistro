from django.db import models

class Semestre(models.Model):

    numero = models.SmallIntegerField()
    nombre = models.CharField(max_length=50)
    
    activo = models.BooleanField(default=True)
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

  
    def __str__(self):
        return self.name

    def __index_(self):
        return id