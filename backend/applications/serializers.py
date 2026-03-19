from rest_framework import serializers
from .models import Application
from jobs.serializers import JobSerializer
from accounts.serializers import UserSerializer

class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    candidate = UserSerializer(read_only=True)

    class Meta:
        model = Application
        fields = '__all__'

class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['job', 'full_name', 'email', 'phone', 'resume', 'cover_letter']

    def validate(self, attrs):
        user = self.context['request'].user
        job = attrs['job']
        if Application.objects.filter(candidate=user, job=job).exists():
            raise serializers.ValidationError({"non_field_errors": ["You have already applied for this job."]})
        return attrs

class ApplicationStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']
