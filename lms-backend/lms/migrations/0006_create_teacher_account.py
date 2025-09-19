from django.db import migrations

def create_teacher_account(apps, schema_editor):
    Student = apps.get_model('lms', 'Student')
    if not Student.objects.filter(Email='Teacher@gmail.com').exists():
        Student.objects.create(
            Name='Teacher',
            Email='Teacher@gmail.com',
            Password='Teaching123!',
            Role='teacher',
            Enrollments=''  # No enrollments for teacher
        )

class Migration(migrations.Migration):
    dependencies = [
        ('lms', '0005_alter_student_name'),
    ]
    operations = [
        migrations.RunPython(create_teacher_account),
    ]
