from django.db import models
from django.conf import settings
import os
import cv2
import numpy
import matplotlib.pyplot

# Create your models here.

class ProcessImage (models.Model):
    image = models.ImageField(upload_to='images/')
    num_colonies = models.IntegerField(null=True)

    def count(self):
        current = cv2.imread(self.image.path)
        current_grey = cv2.cvtColor(current, cv2.COLOR_BGR2GRAY)
        current_canny = cv2.Canny(current_grey, 30, 150, 3)
        (contours, hierarchy) = cv2.findContours(
            current_canny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE
        )

        self.num_colonies = len(contours)
        cv2.drawContours(current, contours, -1, (255, 0, 0), 2)

        contour_image_filename = f'{self.image.name}_contour'
        contour_image_path = os.path.join(settings.MEDIA_ROOT, contour_image_filename)
        cv2.imwrite(f'{contour_image_path}.jpg', current)

        contour_image_url = f'{settings.MEDIA_URL}{contour_image_filename}.jpg'
        return contour_image_url

