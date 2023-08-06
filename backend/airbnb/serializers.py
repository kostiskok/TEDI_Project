from rest_framework import serializers
# from .models import Todo
from .models import Test

# Serializers allow complex data (eg models) to be converted to native Python
#  datatypes that can be converted into JSON, or other content types. (and in reverse)

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['id', 'title', 'description']

# # Using serializers.Serializer
# class TestSerializer(serializers.Serializer):
#     title = serializers.CharField(max_length=100)
#     description = serializers.CharField(max_length=400)
    
#     def create(self, validated_data):
#         return Test.objects.create(validated_data)
    
#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.description = validated_data.get('description', instance.description)
