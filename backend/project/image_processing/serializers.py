from rest_framework import serializers
from .models import ProcessImage

class ProcessImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessImage
        fields = ['id', 'image', 'num_colonies']