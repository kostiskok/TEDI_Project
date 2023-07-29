from rest_framework import serializers
# from .models import Todo

# Serializers allos complex data (eg models) to be converted to native Python
#  datatypes that can be converted into JSON, or other content types. (and in reverse)

# class TodoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Todo
#         fields = ('id', 'title', 'description', 'completed')