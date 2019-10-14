

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.core.management.base import BaseCommand
from django.template.loader import render_to_string
from os import scandir, getcwd
import os
from django.contrib.sites.models import Site





def getEmailContent(filename):
        file_path = os.path.join(settings.FILES_DIR, filename)
        content = open(file_path, 'rb').read()
        return content


# Función que realiza el envío de correo, recibe el email de destinatario y el nombre del paciente
def sendEmail(template, to_email, data, filename=None):
    if (to_email is not None and to_email != ""):
        subject = "Inscripción congreso MESO"
        text = render_to_string('body.txt')
        html_content = render_to_string(template, data)
        try:
            mail = EmailMultiAlternatives(subject, text, None, [to_email], )
            mail.attach_alternative(html_content, "text/html")
            # Ajuntar el archivo pdf
            if filename is not None:
                content = getEmailContent(filename)
                mail.attach(filename, content)
            mail.send(fail_silently=False)
            # self.stdout.write(self.style.SUCCESS('Email enviado a "%s"' % to_email))
            return True
        except Exception as e:
            # self.stdout.write(self.style.ERROR('ERROR: al envíar correo a "%s"' % to_email))
            return False
    return True

def sendEmailProveedor(data, email, codigo_qr):
    template = 'oc_message.html'
    current_site = Site.objects.get_current()
    alerta = str(current_site)+ codigo_qr
    logo = str(current_site)+"/static/backend/img/logoMeso.png"
    cuerpo = {
        'data': data,
        'alerta': alerta,
        'logo':logo,
        'extra': 'Nosotros hacemos el cambio.'
    }
    sendEmail(template, email, cuerpo, None)

