from django.contrib import admin
from .models import Application

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'job', 'status', 'created_at')
    list_filter = ('status', 'job')
