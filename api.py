import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Auto-run migrations on Vercel cold start (SQLite at /tmp is empty each time)
if os.environ.get('VERCEL'):
    import django
    django.setup()
    from django.core.management import call_command
    try:
        call_command('migrate', '--run-syncdb', verbosity=0)
    except Exception as e:
        print(f"Migration warning: {e}")

app = get_wsgi_application()