# Generated by Django 5.0.1 on 2024-05-13 05:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('employer', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('post_date', models.DateField()),
                ('tag', models.JSONField(blank=True)),
                ('education', models.CharField(blank=True, max_length=100, null=True)),
                ('job_level', models.CharField(blank=True, max_length=100, null=True)),
                ('vacancies', models.CharField(max_length=10, null=True)),
                ('req_experience', models.CharField(max_length=10, null=True)),
                ('job_type', models.CharField(max_length=100, null=True)),
                ('job_category', models.CharField(max_length=100, null=True)),
                ('deadline', models.DateField()),
                ('location', models.JSONField(null=True)),
                ('job_benefits', models.JSONField(null=True)),
                ('job_role', models.CharField(blank=True, max_length=200, null=True)),
                ('job_description', models.CharField(max_length=1000)),
                ('salary', models.JSONField(null=True)),
                ('responsiblity', models.JSONField(null=True)),
                ('required_skill', models.JSONField(null=True)),
                ('status', models.CharField(choices=[('Approved', 'Approved'), ('Declined', 'Declined'), ('Expired', 'Expired'), ('Removed', 'Removed'), ('Pending', 'Pending')], default='Pending', max_length=10)),
                ('reason', models.CharField(blank=True, max_length=3000, null=True)),
                ('employer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employer.employer')),
            ],
        ),
    ]
