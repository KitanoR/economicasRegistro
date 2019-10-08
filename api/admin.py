from django.contrib import admin
from .models import Semestre, Silla, Alumno
# Register your models here.
admin.site.register(Silla)
admin.site.register(Semestre)
admin.site.register(Alumno)