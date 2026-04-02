import os
import django
import random

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from jobs.models import Job
from django.contrib.auth import get_user_model

User = get_user_model()

def seed_jobs():
    # Ensure there's at least one user to be the recruiter
    if not User.objects.exists():
        user = User.objects.create_superuser('admin', 'admin@example.com', 'adminpassword')
        print("Created superuser 'admin' as the recruiter.")
    else:
        user = User.objects.first()
        print(f"Using existing user '{user.username}' as the recruiter.")

    jobs_data = [
        {
            "title": "Software Engineer",
            "description": "We are looking for a talented software engineer to join our backend team.",
            "location": "Remote",
            "salary": "$100,000 - $130,000",
            "requirements": "- Python\n- Django\n- SQL\n- 3+ years experience"
        },
        {
            "title": "Frontend Developer",
            "description": "Seeking a creative frontend developer with an eye for design.",
            "location": "New York, NY",
            "salary": "$90,000 - $120,000",
            "requirements": "- React\n- JavaScript\n- Tailwind CSS\n- UI/UX principles"
        },
        {
            "title": "Data Scientist",
            "description": "Join our data team to derive insights from massive datasets.",
            "location": "San Francisco, CA",
            "salary": "$130,000 - $160,000",
            "requirements": "- Python\n- Pandas\n- Machine Learning\n- PhD or MS in relevant field"
        },
        {
            "title": "Product Manager",
            "description": "Looking for a PM to lead our core product initiatives.",
            "location": "Austin, TX (Hybrid)",
            "salary": "$110,000 - $140,000",
            "requirements": "- 5+ years PM experience\n- Agile methodologies\n- Excellent communication"
        },
        {
            "title": "DevOps Engineer",
            "description": "Help us build and maintain scalable infrastructure.",
            "location": "Remote",
            "salary": "$120,000 - $150,000",
            "requirements": "- AWS/GCP\n- Kubernetes\n- CI/CD\n- Terraform"
        },
        {
            "title": "UX/UI Designer",
            "description": "Design beautiful and intuitive user experiences for our platforms.",
            "location": "London, UK",
            "salary": "£60,000 - £80,000",
            "requirements": "- Figma\n- Prototyping\n- User Research\n- Portfolio required"
        },
        {
            "title": "Marketing Specialist",
            "description": "Grow our brand presence and manage digital marketing campaigns.",
            "location": "Remote",
            "salary": "$70,000 - $90,000",
            "requirements": "- SEO/SEM\n- Content Creation\n- Social Media Management"
        },
        {
            "title": "Sales Representative",
            "description": "Drive revenue growth by acquiring new B2B clients.",
            "location": "Chicago, IL",
            "salary": "$60,000 Base + Uncapped Commission",
            "requirements": "- B2B Sales experience\n- CRM familiarity\n- Strong negotiation skills"
        },
        {
            "title": "Customer Support Specialist",
            "description": "Provide top-tier support to our global customer base.",
            "location": "Remote",
            "salary": "$50,000 - $65,000",
            "requirements": "- Excellent written communication\n- Empathy\n- Tech-savvy"
        },
        {
            "title": "Cybersecurity Analyst",
            "description": "Protect our systems and networks from emerging threats.",
            "location": "Washington, D.C.",
            "salary": "$110,000 - $140,000",
            "requirements": "- CISSP or equivalent\n- Security Auditing\n- Incident Response"
        }
    ]

    for data in jobs_data:
        Job.objects.create(
            recruiter=user,
            title=data["title"],
            description=data["description"],
            location=data["location"],
            salary=data["salary"],
            requirements=data["requirements"]
        )
    print("Successfully added 10 job offers!")

if __name__ == '__main__':
    seed_jobs()
