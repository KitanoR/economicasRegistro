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
            grupo_once = [1,2,5,6,7,8,9,11,12,13,14]
            grupo_diez = [3,4,15]
            grupo_nueve = [10]
            for x in range(1, 16):
                letra_inicial = pivote + x
                letra_silla = chr(letra_inicial)
                for i in range(1, 12):
                    if x in grupo_diez and i < 11:
                        self.registrarSilla(i, letra_silla)
                    elif x in grupo_nueve and i < 10:
                        self.registrarSilla(i, letra_silla)
                    elif x in grupo_once:
                        self.registrarSilla(i, letra_silla)
                    else:
                        break

        except Exception as e:
            print("error {}".format(e))
            pass

    def handle(self, *args, **options):
        self.crearLugares()
