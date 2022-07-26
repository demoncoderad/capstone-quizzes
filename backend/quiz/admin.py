from .models import Category, Option, Question, Quiz
from django.contrib import admin

# Register your models here.
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Category)
admin.site.register(Option)