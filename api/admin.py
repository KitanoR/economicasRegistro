from django.contrib import admin
from .models import Semestre, Silla, Alumno,Asignacion, Carrera, Configuracion
# Register your models here.
admin.site.register(Silla)
admin.site.register(Semestre)
admin.site.register(Alumno)
admin.site.register(Asignacion)
admin.site.register(Carrera)
admin.site.register(Configuracion)