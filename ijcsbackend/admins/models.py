from django.db import models
from django.contrib.auth.models import BaseUserManager 
from django.utils.html import mark_safe
# Create your models here.
 
class MyAccountManager(BaseUserManager):
    def create_user(self , full_name ,profile_picture, email , phone  ,password=None):
        if not email:
            raise ValueError('Company must have an email address')
        if not  full_name:
            raise ValueError('Company must have a name')
        user=self.model(
            email=self.normalize_email(email),
            full_name= full_name,
            profile_picture=profile_picture,
            phone=phone ,
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
class Administrator(models.Model):
     
    ACCESS_LEVEL={
         ("super_admin","super_admin"),
         ("admin","admin"),
     }
     
     
    full_name =models.CharField(max_length=50) 
    profile_picture=models.ImageField(upload_to='admin/logo/')
    phone=models.CharField(max_length=15)
    email=models.EmailField(max_length=100,unique=True)
    password=models.CharField(max_length=150) 
    access_level = models.CharField(max_length=50, choices=ACCESS_LEVEL, default="admin")
    #required
    date_joined=models.DateField(auto_now_add=True)
    last_login=models.DateTimeField(auto_now_add=True)
    is_admin=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_employer=models.BooleanField(default=False)
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
    
    def profile_picture_tag(self):
        if self.profile_picture:
            return mark_safe('<img src="%s" width="50" height="50" />' % self.profile_picture.url)
        else:
            return 'No Image Found'
    profile_picture_tag.short_description = 'Profile Picture'
