# Generated by Django 2.1.2 on 2019-10-14 03:38

from django.db import migrations

def load_inital_data(apps, schema_editor):
    #Sillas reservadas
    Silla = apps.get_model("api", "Silla")
    sillas = Silla.objects.filter(
        fila_letra="A"
    ).update(
        estado_lugar=4
    )

    #Creación de carreras
    Carrera = apps.get_model("api", "Carrera")
    Carrera(nombre="Mercadotecnia y Publicidad").save()
    Carrera(nombre="Auditoría").save()
    Carrera(nombre="Informática y Administración de empresas").save()
    Carrera(nombre="Comercio Internacional").save()
    Carrera(nombre="Maestría en Administración de Empresas").save()
    #Creación de semestres
    Semestre = apps.get_model("api", "Semestre")
    Semestre(
        numero = 1,
        nombre = "primero"
    ).save()
    Semestre(
        numero = 2,
        nombre = "segundo"
    ).save()
    Semestre(
        numero = 3,
        nombre = "tercero"
    ).save()
    Semestre(
        numero = 4,
        nombre = "cuarto"
    ).save()
    Semestre(
        numero = 5,
        nombre = "quinto"
    ).save()
    Semestre(
        numero = 6,
        nombre = "sexto"
    ).save()
    Semestre(
        numero = 7,
        nombre = "séptimo"
    ).save()
    Semestre(
        numero = 8,
        nombre = "octavo"
    ).save()
    Semestre(
        numero = 9,
        nombre = "noveno"
    ).save()
    Semestre(
        numero = 10,
        nombre = "décimo"
    ).save()
    Semestre(
        numero = 11,
        nombre = "undécimo"
    ).save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_configuracion'),
    ]

    operations = [
        migrations.RunPython(load_inital_data)
    ]
