from django.urls import path, include
# from .views import Index
# from .views import test_list, test_details
# from .views import TestList, TestDetails
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register('tests', TestViewSet, basename='tests')
router.register('users', UserViewSet)

router.register('rooms', RoomViewSet)
router.register('roomhost', RoomHostViewSet)
router.register('roomadmin', RoomAdminViewSet)
router.register('roomxml', RoomXMLViewSet)

router.register('reviews', ReviewViewSet)
router.register('reviewsxml', ReviewXMLViewSet)

router.register('messages', MessageViewSet)

router.register('bookings', RentViewSet)
router.register('bookingsxml', RentXMLViewSet)



urlpatterns = [
    path('airbnb/', include(router.urls)), 
    path('airbnb/details', review_details),
    path('airbnb/recommendation/<int:id>/',room_recommendations),
    path('airbnb/recommendation/',room_recommendations)
]

# For alternate views, urlpatterns may be:
# urlpatterns = [
    # path('', Index)
    # path('tests/', test_list),
    # path('tests/<int:pk>/', test_details),
    # path('tests/', TestList.as_view()),
    # path('tests/<int:id>/', TestDetails.as_view())
# ]
