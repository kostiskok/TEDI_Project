from rest_framework import serializers
# from .models import Todo
from .models import *

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
        fields = ['id', 
                  'username', 
                  'password', 
                  'first_name', 
                  'last_name',
                  'email',
                  'phone',
                  'isRenter',
                  'waitingHost',
                  'isHost'
                  ]

        extra_kwargs = {'password':{
            'write_only': True,
            'required': True
        }}
        
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
    
class UserStatusSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField('get_is_staff')
    
    class Meta:
        model = CustomUser
        fields = ['id', 'isAdmin', 'isRenter', 'isHost', 'waitingHost']
    
    def get_is_staff(self, obj):
        return obj.is_staff
    
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields=['id','name','desc','owner','longitude','latitude','address','date_start','date_end','price_per_day','price_per_person','max_num_people','num_of_beds','num_of_bedrooms',
                'num_of_bathrooms','room_type','area','living_room','wifi','air_condition','heating','stove','television','parking','elevator']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields=['id','user','room','score','review_text','date']
        
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields=['id','room_id','previous_message']
        
class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields=['id','room_id','date_start','date_end']
        


# # Using serializers.Serializer
# class TestSerializer(serializers.Serializer):
#     title = serializers.CharField(max_length=100)
#     description = serializers.CharField(max_length=400)
    
#     def create(self, validated_data):
#         return Test.objects.create(validated_data)
    
#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.description = validated_data.get('description', instance.description)
