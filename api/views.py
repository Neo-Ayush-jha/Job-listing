from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_jobs(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def add_job(request):
    logger.debug(f"Received data: {request.data}")
    serializer = JobSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        logger.debug(f"Saved data: {serializer.data}")
        return Response(serializer.data, status=201)
    
    logger.error(f"Invalid data: {serializer.errors}")
    return Response(serializer.errors, status=400)



@api_view(['GET'])
@permission_classes([AllowAny])
def get_job(request, id):
    try:
        job = Job.objects.get(id=id) 
        serializer = JobSerializer(job)
        return Response(serializer.data)
    except Job.DoesNotExist:
        logger.error(f"Job with id {id} not found.")
        return Response({"detail": "Job not found."}, status=status.HTTP_404_NOT_FOUND)