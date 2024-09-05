from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
            if user.check_password(password):
                return user
        except UserModel.DoesNotExist:
            return None


    def get_user(self,user_id):
        userModel=get_user_model()
        try:
            return userModel.objects.get(pk=user_id)
        except userModel.DoesNotExist:
            return None