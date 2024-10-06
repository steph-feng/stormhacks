from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import ProcessImage
from .serializers import ProcessImageSerializer

# Create your views here.

class ProcessImageView(APIView):

    def post(self, request):
        serializer = ProcessImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            image = ProcessImage.objects.get(id=serializer.data['id'])
            image_url = image.count()  
            return Response({ 'image_url': image_url, 'num_colonies': image.num_colonies }, 
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

