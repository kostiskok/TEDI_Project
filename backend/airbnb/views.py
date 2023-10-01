from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication

from rest_framework.pagination import PageNumberPagination
from rest_framework import mixins

from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import AllowAny

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework_xml.renderers import XMLRenderer

from .models import *
from .serializers import *

from users.models import CustomUser

import decimal
from datetime import datetime
from .recommendation import get_user_recommendations

# Custom Permissions

# -> CustomUser
class IsHimself(BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.user:
            return obj.id == request.user.id
        else:
            return False

class IsHost(BasePermission):
    
    def has_permission(self, request, view):
        return not request.user.is_anonymous and request.user.isHost
    
    def has_object_permission(self, request, view, obj):
        if request.user:
            return request.user.isHost
        else:
            return False

class IsRoomOwner(BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.user:
            return request.user == obj.owner
        else:
            return False

# Paginator

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# Create your views here.

# Usins model viewset:
# class TestViewSet(viewsets.ModelViewSet):
#     queryset = Test.objects.all()
#     serializer_class = TestSerializer
#     permission_classes = [IsAuthenticated]
#     authentication_classes = (TokenAuthentication,)

'''
User View Set: (we want all mixins included, so ModelViewSet)
--CreateModelMixin / POST -- everyone
--RetrieveModelMixin / GET -- everyone
--UpdateModelMixin / PUT -- admin + owner
--DestroyModelMixin / DELETE -- admin + owner
--ListModelMixin / GET -- everyone
'''
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    
    def get_permissions(self):
        if self.action == 'create' or self.action == 'list' or self.action == 'retrieve':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser | IsHimself]
        return super(self.__class__,self).get_permissions()

'''
Room View set:
--CreateModelMixin / POST -- host
--RetrieveModelMixin / GET -- everyone
--UpdateModelMixin / PUT -- admin + owner
--DestroyModelMixin / DELETE -- admin + owner
--ListModelMixin / GET -- everyone
'''
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    pagination_class = StandardResultsSetPagination
    
    authentication_classes = (TokenAuthentication,)
    
    # Keep only the results close to the selected latitude and longitude
    # * (long ~1, lat ~1)
    def locationFilter(self, r, lat, lon):
        results = []
        
        for room in r:
            curLat = room.latitude
            curLon = room.longitude
            
            if (abs(curLat - lat) < 1 and abs(curLon - lon) < 1):
                results.append(room)
            
        return results
    
    def isAvailable(self, r, dateStart, dateEnd):
        results = []
        
        for room in r:
            roomDateStart = room.date_start
            roomDateEnd = room.date_end
            
            # Date must be first of all be inside the room's availabity dates
            if roomDateStart <= dateStart <= roomDateEnd and roomDateStart <= dateEnd <= roomDateEnd:
                
                bookings = Rent.objects.all().filter(room_id=room.id)
                flag = False
                for booking in bookings:
                
                    bookingDateStart = booking.date_start
                    bookingDateEnd = booking.date_end
                
                    if dateEnd >= bookingDateStart and dateStart <= bookingDateEnd:
                        flag = True
                
                if flag == False:
                    results.append(room)
                
        
        return results
    
    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsHost]
        elif self.action == 'retrieve' or self.action == 'list':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser | IsRoomOwner]
        return super(self.__class__,self).get_permissions()

    def get_queryset(self):
        # Order the results by price
        results = super().get_queryset().order_by('price_per_day')
        
        # Filter the results by:
        maxcost = self.request.GET.get('maxcost') # max cost per day
        type = self.request.GET.get('type') # type of the room
        lr = self.request.GET.get('lr') # has living room
        wifi = self.request.GET.get('wifi') # has wifi
        ac = self.request.GET.get('ac') # has ac
        heating = self.request.GET.get('heating') # has heating
        stove = self.request.GET.get('stove') # has stove
        parking = self.request.GET.get('parking') # has parking
        tv = self.request.GET.get('tv') # has tv
        elevator = self.request.GET.get('elevator') # has elevator
        
        # Used in the main page search
        # - Check if max_num_people > people that will rent
        people = self.request.GET.get('people') 
        # - As for the location, check if the latitude and longitude selected are
        #     close to the position of the room
        lat = self.request.GET.get('lat') 
        lon = self.request.GET.get('lon')
        # - For every result/room, get all the bookings and check if there are no overlaps
        dateStart = self.request.GET.get('dateStart')
        dateEnd = self.request.GET.get('dateEnd')
        
        id = self.request.GET.get('id')
        
        if maxcost is not None and maxcost != '':
            results = results.filter(price_per_day__lte=maxcost)
        
        if type is not None and type != '':
            results = results.filter(room_type=type)
        
        if lr is not None:
            results = results.filter(living_room=True)
        
        if wifi is not None:
            results = results.filter(wifi=True)
            
        if ac is not None:
            results = results.filter(air_condition=True)
        
        if heating is not None:
            results = results.filter(heating=True)
            
        if stove is not None:
            results = results.filter(stove=True)
        
        if parking is not None:
            results = results.filter(parking=True)
        
        if tv is not None:
            results = results.filter(television=True)

        if elevator is not None:
            results = results.filter(elevator=True) 
        
        
        if people is not None and people != '':
            results = results.filter(max_num_people__gte=people)
        
        if lat is not None and lat != '' and lon is not None and lon != '':
            results = self.locationFilter(results, decimal.Decimal(lat), decimal.Decimal(lon))
        
        if id is not None and id != '':
            results = results.filter(id=id)
        
        if dateStart is not None and dateStart != '' and dateEnd is not None and dateEnd != '':
            results = self.isAvailable(results, datetime.strptime(dateStart, '%Y-%m-%d').date(), datetime.strptime(dateEnd, '%Y-%m-%d').date())
        
        return results
    
    def get_all_rooms(self, request):
        # Fetch all rooms from the database
        results = Room.objects.all()

        # Serialize the queryset to JSON or any other desired format
        serializer = RoomSerializer(results, many=True)

        return Response(serializer.data)
    

class RoomHostViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsHost, IsRoomOwner]
    
    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user.id)

class RoomAdminViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAdminUser]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    def host_filter(self, r, host):
        results = []
        
        for review in r:
            owner = review.room.owner.id
            if owner == int(host):
                print('?')
                results.append(review)
            
        return results
    
    def get_queryset(self):
        results = super().get_queryset()
        
        id = self.request.GET.get('id')
        if id is not None and id != '':
            results = results.filter(user=id)
        
        host = self.request.GET.get('host')
        if host is not None and host != '':
            results = self.host_filter(results, host)
        
        room = self.request.GET.get('room')
        if room is not None and room != '':
            results = results.filter(room=room)
        
        return results
        

@api_view(['GET'])
def review_details(request):
    
    if request.method == 'GET':
    
        details = []
    
        rooms = Room.objects.all()
        for room in rooms:
            id = room.id
            
            reviews = Review.objects.all().filter(room=id)
            
            count = len(reviews)
            avg = 0
            
            if count != 0:
                for review in reviews:
                    avg += review.score
                avg /= count
                
            details.append(
                {'id':id, 
                 'count':count, 
                 'average':avg
                }
            )

        return Response(details)
    
@api_view(['GET'])
def room_recommendations(request,id=None):
    if request.method == 'GET':
        recommendations = get_user_recommendations(id)
        return Response(recommendations)

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class RentViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer

# XML views for exports
class RoomXMLViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAdminUser]
    renderer_classes = [XMLRenderer,]

class RentXMLViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    renderer_classes = [XMLRenderer,]

class ReviewXMLViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    renderer_classes = [XMLRenderer,]
    
    def host_filter(self, r, host):
        results = []
        
        for review in r:
            owner = review.room.owner.id
            if owner == int(host):
                results.append(review)
            
        return results
    
    def get_queryset(self):
        results = super().get_queryset()
        
        id = self.request.GET.get('id')
        if id is not None and id != '':
            results = results.filter(user=id)
        
        host = self.request.GET.get('host')
        if host is not None and host != '':
            results = self.host_filter(results, host)
        
        return results

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
    