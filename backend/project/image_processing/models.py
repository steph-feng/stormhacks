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
        current_blur = cv2.medianBlur(current_grey, 3)
        current_canny = cv2.Canny(current_blur, 30, 150, 3)
        current_dilate = cv2.dilate(current_canny, (1, 1), iterations=0)
        (contours, hierarchy) = cv2.findContours(current_dilate, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

        num_colonies = []
        
        rim_blur = cv2.GaussianBlur(current_grey,(5,5),0)
        rim_circles = cv2.HoughCircles(rim_blur, cv2.HOUGH_GRADIENT, 1, 30, param1=40, param2=120, minRadius=175, maxRadius=250)
        if rim_circles is not None:
            rim_circles = numpy.uint16(numpy.around(rim_circles))
            rim_center_x, rim_center_y, rim_radius = rim_circles[0][0]  
            cv2.circle(current, (rim_center_x, rim_center_y), rim_radius, (0, 255, 0), 2)

            min_distance_from_rim = 70

            for contour in contours:
                M = cv2.moments(contour)
                if M['m00'] > 0: 
                    contour_center_x = int(M['m10'] / M['m00'])
                    contour_center_y = int(M['m01'] / M['m00'])
                    distance_to_rim_center = numpy.sqrt((contour_center_x - rim_center_x) ** 2 + (contour_center_y - rim_center_y) ** 2)
                    distance_to_rim_edge = abs(distance_to_rim_center - rim_radius)
            
                    if distance_to_rim_edge > min_distance_from_rim:
                        cv2.drawContours(current, [contour], -1, (0, 0, 255), 1)
                        num_colonies.append(contour)


        self.num_colonies = len(num_colonies)
        contour_image_filename = f'{self.image.name}_contour'
        contour_image_path = os.path.join(settings.MEDIA_ROOT, contour_image_filename)
        cv2.imwrite(f'{contour_image_path}.jpg', current)
        contour_image_url = f'{settings.MEDIA_URL}{contour_image_filename}.jpg'
        return contour_image_url

