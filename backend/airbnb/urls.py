from django.urls import path, include
# from .views import Index
# from .views import test_list, test_details
# from .views import TestList, TestDetails
from .views import TestViewSet
from .views import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('tests', TestViewSet, basename='tests')
router.register('users', UserViewSet)

urlpatterns = [
    path('airbnb/', include(router.urls)) 
]

# For alternate views, urlpatterns may be:
# urlpatterns = [
    # path('', Index)
    # path('tests/', test_list),
    # path('tests/<int:pk>/', test_details),
    # path('tests/', TestList.as_view()),
    # path('tests/<int:id>/', TestDetails.as_view())
# ]
