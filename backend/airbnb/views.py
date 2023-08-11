from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import *
from .serializers import *
# from .serializers import TestSerializer
# from .serializers import UserSerializer

from users.models import CustomUser

# Create your views here.

# Usins model viewset:
class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class RentViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    

# -----------------------------------------------
# Alternate ways for the views:
# -----------------------------------------------

# 1. Function based API Views -------------------

# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# # @csrf_exempt
# @api_view(['GET', 'POST'])
# def test_list(request):
    
#     #get all tests
#     if request.method == 'GET':
#         tests = Test.objects.all()
#         serializer = TestSerializer(tests, many=True)
#         # return JsonResponse(serializer.data, safe=False)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         # data = JSONParser().parse(request)
#         serializer = TestSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             # return JsonResponse(serializer.data, status=201)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# # @csrf_exempt
# @api_view(['GET', 'PUT', 'DELETE'])
# def test_details(request, pk):
#     try:
#         test = Test.objects.get(pk=pk)
        
#     except Test.DoesNotExist:
#         # return HttpResponse(status=404)
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = TestSerializer(test)
#         # return JsonResponse(serializer.data)
#         return Response(serializer.data)
    
#     elif request.method == 'PUT':
#         # data = JSONParser().parse(request)
#         # serializer = TestSerializer(test, data=data)
#         serializer = TestSerializer(test, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             # return JsonResponse(serializer.data)
#             return Response(serializer.data)
#         # return JsonResponse(serializer.errors, status=400)
#         return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         test.delete()
#         # return HttpResponse(status=204)
#         return Response(status=status.HTTP_204_NO_CONTENT)

# 2. Class Based API Views -----------------------

# from rest_framework.decorators import APIView
# class TestList(APIView):
    
#     def get(self, request):
#         tests = Test.objects.all()
#         serializer = TestSerializer(tests, many=True)
#         return Response(serializer.data)
    
#     def post(self, request):
#         serializer = TestSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class TestDetails(APIView):
    
#     def get_object(self, id):
#         try:
#             return Test.objects.get(id=id)
#         except Test.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
        
#     def get(self, request, id):
#         test = self.get_object(id)
#         serializer = TestSerializer(test)
#         return Response(serializer.data)
    
#     def put(self, request, id):
#         test = self.get_object(id)
#         serializer = TestSerializer(test, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def delete(self, request, id):
#         test = self.get_object(id)
#         test.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# 3. Generic APIViews and Mixins -----------------

# from rest_framework import generics
# from rest_framework import mixins
# class TestList(generics.GenericAPIView, mixins.ListModelMixin,
#                mixins.CreateModelMixin):
    
#     queryset = Test.objects.all()
#     serializer_class = TestSerializer
    
#     def get(self, request):
#         return self.list(request)
    
#     def post(self, request):
#         return self.create(request)
    
# class TestDetails(generics.GenericAPIView, mixins.RetrieveModelMixin,
#                  mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    
#     queryset = Test.objects.all()
#     serializer_class = TestSerializer
    
#     lookup_field = 'id'
    
#     def get(self, request, id):
#         return self.retrieve(request, id=id)
    
#     def put(self, request, id):
#         return self.update(request, id=id)
    
#     def delete(self, request, id):
#         return self.destroy(request, id=id)


# 4. Viewset ------------------------------------

# from django.shortcuts import get_object_or_404
# class TestViewSet(viewsets.ViewSet):

#     def list(self, request):
#         tests = Test.objects.all()
#         serializer = TestSerializer(tests, many=True)
#         return Response(serializer.data)
    
#     def create(self, request):
#         serializer = TestSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def retrieve(self, request, pk=None):
#         queryset = Test.objects.all()
#         test = get_object_or_404(queryset, pk=pk)
#         serializer = TestSerializer(test)
#         return Response(serializer.data)
    
#     def update(self, request, pk=None):
#         test = Test.objects.get(pk=pk)
#         serializer = TestSerializer(test, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def destroy(self, request, pk=None):
#         test = Test.objects.get(pk=pk)
#         test.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# 5. Generic Viewset -----------------------------

# class TestViewSet(viewsets.GenericViewSet, mixins.ListModelMixin,
#                   mixins.CreateModelMixin, mixins.RetrieveModelMixin,
#                   mixins.UpdateModelMixin, mixins.DestroyModelMixin):
#     queryset = Test.objects.all()
#     serializer_class = TestSerializer
    