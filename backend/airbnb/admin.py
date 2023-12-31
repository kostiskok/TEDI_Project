from django.contrib import admin
# from .models import Todo
from .models import Room, Review, Message, Rent
from .models import Test

# class TodoAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'completed')

# Register your models here.

# admin.site.register(Todo, TodoAdmin)
admin.site.register(Room)
admin.site.register(Review)
admin.site.register(Message)
# admin.site.register(Test)
# admin.site.register(Rent)

@admin.register(Rent)
class RentModel(admin.ModelAdmin):
    list_filter = ('room_id', 'date_start')
    list_display = ('id', 'room_id', 'date_start', 'date_end')
    
@admin.register(Test)
class TestModel(admin.ModelAdmin):
    list_filter = ('title', 'description')
    list_display = ('title', 'description')