from rest_framework import serializers
from .models import *


class FavouritiesJobSerializer(serializers.ModelSerializer):
    class Meta:
        model= Favorite
        fields='__all__'
