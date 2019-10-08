import requests
import datetime
from django.core.management.base import BaseCommand
from xml.etree import ElementTree
from api.models import Silla


class Command(BaseCommand):

    def registrarSilla(self,fila, letra): 
        silla = Silla(
            no_lugar= fila,
            fila_letra=letra
        )
        silla.save()

    def crearLugares(self):
        pivote = 64
        try:
           for x in range(1, 15):
               letra_inicial = pivote + x
               letra_silla = chr(letra_inicial)
               for i in range(1, 11):
                    if x <= 2:
                        self.registrarSilla(i, letra_silla)
                    else:
                        if i != 10:
                            self.registrarSilla(i, letra_silla)
                        

        except Exception as e:
            print("error {}".format(e))
            pass

    def handle(self, *args, **options):
        self.crearLugares()
