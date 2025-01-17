# Generated by Django 5.0.1 on 2024-05-13 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Job', '0002_alter_job_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='status',
            field=models.CharField(choices=[('Declined', 'Declined'), ('Removed', 'Removed'), ('Pending', 'Pending'), ('Expired', 'Expired'), ('Approved', 'Approved')], default='Pending', max_length=10),
        ),
    ]
