from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    posted_at = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', required=False)
    modified_date = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', required=False)

    class Meta:
        model = Job
        fields = '__all__'