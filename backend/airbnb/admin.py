from django.contrib import admin
# from .models import Todo
from .models import Room, Review, Message, Rent

# class TodoAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'completed')

# Register your models here.

# admin.site.register(Todo, TodoAdmin)

admin.site.register(Room)
admin.site.register(Review)
admin.site.register(Message)
admin.site.register(Rent)