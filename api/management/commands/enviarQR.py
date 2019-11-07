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
    def add_arguments(self, parser):
        parser.add_argument(
            '--inicio', nargs='?', 
            help='Pk  donde inicia el envío de correos',
            type=int
        )
        parser.add_argument(
            '--fin', nargs='?', 
            help='Pk  donde finaliza el envío de correos',
            type=int
        )


          


    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Ejecutando envíos...'))
        inicio =  options['inicio'] if options['inicio'] else 0
        fin =  options['fin'] if options['fin'] else 0
        # print(fin)
        self.recorrerAsignaciones(inicio, fin)


    def recorrerAsignaciones(self, inicio, fin):
        filters = {'activo': True}
        if(inicio>0 and fin>0):
            filters['pk__range'] = (inicio, fin)
            self.stdout.write(self.style.SUCCESS('Enviando correos desde {} hasta {} ...'.format(inicio, fin)))
        elif(inicio>0):
            filters['pk__gte'] = int(inicio)
            self.stdout.write(self.style.SUCCESS('Enviando correos desde {}...'.format(inicio)))
        elif(fin>0):
            filters['pk__lte'] = int(fin)
            self.stdout.write(self.style.SUCCESS('Enviando correos hasta {}...'.format(fin)))

        asignaciones = Asignacion.objects.filter(**filters)
        for asignacion in asignaciones:
            self.sendEmailQR(asignacion)
            self.stdout.write(self.style.SUCCESS('Enviando...'))
        else:
            self.stdout.write(self.style.SUCCESS('Finalizado.'))


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




