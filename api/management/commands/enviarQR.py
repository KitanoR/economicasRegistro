import requests
import datetime
from django.core.management.base import BaseCommand
from api.models import Alumno, Silla, Semestre, Asignacion, Configuracion
from api.utils.enviarcorreo import  sendEmailProveedor
from api.serializers import AlumnoSerializer, AlumnoReadSerializer


from io import BytesIO
from django.core.files import File
import qrcode

class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Ejecutando envíos...'))
        self.recorrerAsignaciones()


    def recorrerAsignaciones(self):
        asignaciones = Asignacion.objects.filter(activo=True)
        for asignacion in asignaciones:
            self.sendEmailQR(asignacion)
            self.stdout.write(self.style.SUCCESS('Enviando...'))
        else:
            self.stdout.write(self.style.SUCCESS('Finalizado. Ha enviado 0 correos.'))


    def sendEmailQR(self, asignacion):
        silla = asignacion.silla
        alumno = asignacion.alumno
        orden_correo = {
                    'silla': '{}-{}'.format(silla.fila_letra, silla.no_lugar),
                    'usuario': alumno.nombre,
                    'no_orden': alumno.carnet,
                    'fecha': '',
                    'monto': 90.00
        }
        codigo = str(alumno.codigo_qr.url)
        sendEmailProveedor(orden_correo, alumno.correo, codigo_qr=codigo)




