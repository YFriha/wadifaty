from rest_framework import serializers
from .models import Job
from accounts.serializers import UserSerializer

class JobSerializer(serializers.ModelSerializer):
    recruiter = UserSerializer(read_only=True)

    class Meta:
        model = Job
        fields = '__all__'

class JobCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['title', 'description', 'location', 'salary', 'requirements']
