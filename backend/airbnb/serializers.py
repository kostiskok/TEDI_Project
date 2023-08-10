from rest_framework import serializers
# from .models import Todo
from .models import Test

from users.models import CustomUser

from rest_framework.authtoken.views import Token

# Serializers allow complex data (eg models) to be converted to native Python
#  datatypes that can be converted into JSON, or other content types. (and in reverse)

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['id', 'title', 'description']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'phone']

        extra_kwargs = {'password':{
            'write_only': True,
            'required': True
        }}
        
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

# # Using serializers.Serializer
# class TestSerializer(serializers.Serializer):
#     title = serializers.CharField(max_length=100)
#     description = serializers.CharField(max_length=400)
    
#     def create(self, validated_data):
#         return Test.objects.create(validated_data)
    
#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.description = validated_data.get('description', instance.description)
