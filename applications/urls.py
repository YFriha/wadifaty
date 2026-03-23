from django.urls import path
from .views import ApplicationListView, ApplicationCreateView, ApplicationDetailView, ApplicationStatusUpdateView

urlpatterns = [
    path('', ApplicationListView.as_view(), name='application-list'),
    path('apply/', ApplicationCreateView.as_view(), name='application-create'),
    path('<int:pk>/', ApplicationDetailView.as_view(), name='application-detail'),
    path('<int:pk>/status/', ApplicationStatusUpdateView.as_view(), name='application-status-update'),
]
