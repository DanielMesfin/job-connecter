from django.db import models
from django.contrib.auth.models import BaseUserManager 
from django.utils.html import mark_safe

# Create your models here.
 
class MyAccountManager(BaseUserManager):
    def create_user(self,full_name,username , email , location , phone ,  logo , banner , about ,  organizationType ,  industryType , yearOfStablishment , portifolio ,  vision , numberOfEmployees , socialMediaLink ,password=None):
        if not email:
            raise ValueError('Company must have an email address')
        if not  full_name:
            raise ValueError('Company must have a name')
        user=self.model(
            email=self.normalize_email(email),
            full_name= full_name,
            username=username, 
            location=location ,
            phone=phone ,
            logo=logo ,
            banner=banner ,
            about=about ,
            organizationType=organizationType ,
            industryType=industryType ,
            yearOfStablishment=yearOfStablishment ,
            portifolio=portifolio ,
            vision=vision ,
            numberOfEmployees=numberOfEmployees ,
            socialMediaLink=socialMediaLink,
            
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user_super(self , first_name,username, email ,  phone ,password=None):
        if not email:
            raise ValueError('user must have an email address')
        if not username:
            raise ValueError('user must have a username')
        user=self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            phone=phone, 
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    #creating super user
    def create_superuser(self , first_name ,username,email,password):
        user=self.create_user_super(
            email=self.normalize_email(email),
            username=username,
            password=password,
            first_name=first_name,
            
        )
        user.is_admin=True
        user.is_active=True
        user.is_staff=True
        user.is_employer=True
        user.is_superadmin=True
        user.save(using=self._db)
        return user
class Employer(models.Model):
    full_name=models.CharField(max_length=50) 
    username=models.CharField(max_length=50,unique=True) 
    email=models.EmailField(max_length=100,unique=True)
    password=models.CharField(max_length=150)
     
    phone=models.CharField(max_length=15,blank=True)
    location=models.CharField(max_length=15 ,blank=True)
    logo=models.ImageField(upload_to='logo/' ,blank=True)   #path for image file
    banner=models.ImageField(upload_to='banners/' ,blank=True) #path for image file
    about=models.CharField(max_length=1000,blank=True)
    organizationType=models.CharField(max_length=150 ,blank=True)
    industryType=models.CharField(max_length=150 ,blank=True)
    yearOfStablishment=models.DateField(null=True, blank=True)
    portifolio=models.CharField(max_length=150 ,blank=True) 
    vision=models.CharField(max_length=500,blank=True)
    numberOfEmployees=models.CharField(max_length=150 ,blank=True)
    socialMediaLink=models.JSONField(blank=True,null=True )
    email_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=255, blank=True, null=True)
    
    #required
    date_joined=models.DateField(auto_now_add=True)
    last_login=models.DateTimeField(auto_now_add=True)
    is_admin=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    is_employer=models.BooleanField(default=True)
    is_active=models.BooleanField(default=False)
    is_superadmin=models.BooleanField(default=False)
    
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name','email']   
    
    objects=MyAccountManager()
    
    
    def __str__(self):
        return self.email
    
    def has_perm(self,perm,obj=None):
        return self.is_admin
    def has_module_perms(self,add_label):
        return True
    
    def logo_tag(self):
        if self.logo:
            return mark_safe('<img src="%s" width="50" height="50" />' % self.logo.url)
        else:
            return 'No Image Found'
    logo_tag.short_description = 'Profile Picture'

    def banner_tag(self):
        if self.banner:
            return mark_safe('<img src="%s" width="50" height="50" />' % self.banner.url)
        else:
            return 'No Image Found'
    banner_tag.short_description = 'Banner'
    
    