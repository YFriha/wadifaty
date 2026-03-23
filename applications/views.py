from rest_framework import generics, permissions
from .models import Application
from .serializers import ApplicationSerializer, ApplicationCreateSerializer, ApplicationStatusUpdateSerializer

class IsCandidate(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'candidate'



class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'candidate':
            return Application.objects.filter(candidate=user)
        elif user.role == 'admin':
            return Application.objects.all()
        return Application.objects.none()

class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationCreateSerializer
    permission_classes = [IsCandidate]

    def perform_create(self, serializer):
        serializer.save(candidate=self.request.user)

class ApplicationDetailView(generics.RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        user = self.request.user
        if user.role == 'candidate' and obj.candidate != user:
            self.permission_denied(self.request)
        return obj

class ApplicationStatusUpdateView(generics.UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationStatusUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
