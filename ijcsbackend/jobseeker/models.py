
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import FileExtensionValidator
from django.db import models
from phone_field import PhoneField
from django.db.models import JSONField

# JobSeeker models here
class JobSeekerAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, gender, nationality, birth_date, location, bio, phone, educations, skills, profile_picture, portifolio, socialMediaLink, password=None):
        if not email:
            raise ValueError('Job Seeker must have an email')
        if not first_name:
            raise ValueError('Job Seeker must have a name')
        user = self.model(
            email=self.normalize_email(email),
            profile_picture=profile_picture,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            location=location,
            gender=gender,
            nationality=nationality,
            birth_date=birth_date,
            educations=educations,
            skills=skills,
            portifolio=portifolio,
            bio=bio,
            socialMediaLink=socialMediaLink,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user_super(self, first_name, last_name, email, phone, password=None):
        if not email:
            raise ValueError('User must have an email address')
        if not first_name or not last_name:
            raise ValueError('User must have a first and last name')
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            phone=phone,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, password=None):
        user = self.create_user_super(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_job_seeker = True
        user.is_active = True
        user.save(using=self._db)
        return user

class JobSeeker(AbstractBaseUser):
    email = models.EmailField(max_length=100, unique=True,null=True,blank=True)
    profile_picture = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    experience = models.PositiveIntegerField(blank=True,null=True)
    # resume = models.FileField(upload_to='resumes/',blank=True,null=True)
    first_name = models.CharField(max_length=50,blank=True,null=True)
    last_name = models.CharField(max_length=50,null=True,blank=True)
    username = models.CharField(max_length=50,blank=True,null=True)
    phone = PhoneField(unique=False, null=True, blank=True)
    location = models.CharField(max_length=50,null=True,blank=True)
    socialMediaLink = models.JSONField(blank=True, null=True)
    birth_date = models.DateField(null=True,blank=True)
    bio = models.CharField(max_length=250, null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    nationality = models.CharField(max_length=250, null=True, blank=True)
    portfolio = models.FileField(upload_to='uploads/portfolios', null=True, blank=True,validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])])
    educations = JSONField(blank=True,null=True)
    skills = JSONField(blank=True,null=True)
    date_joined = models.DateField(auto_now_add=True)
    email_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=255, blank=True, null=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_job_seeker = models.BooleanField(default=True)
    is_active = models.BooleanField(default=False)
    # Add any extra fields for job seekers below

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone', 'gender', 'nationality', 'birth_date', 'location', 'skills']

    objects = JobSeekerAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_job_seeker

    def has_module_perms(self, add_label):
        return True