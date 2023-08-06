from django.urls import path
# from .views import Index
# from .views import test_list, test_details
from .views import TestList, TestDetails

urlpatterns = [
    # path('', Index)
    # path('tests/', test_list),
    # path('tests/<int:pk>/', test_details),
    path('tests/', TestList.as_view()),
    path('tests/<int:id>/', TestDetails.as_view())
]

