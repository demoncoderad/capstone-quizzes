from django.urls import include, path
from . import views
urlpatterns = [
    path('get/', views.getQuiz, name='getquiz'),
    path('submit/', views.attemptQuiz, name='submitquiz'),
    path('create/quiz/', views.createQuiz, name='newquiz'),
    path('create/ques/', views.createQues, name='newques'),
    path('get/categories/', views.getCategories, name='getcats'),
    path('update/quiz/', views.updateQuiz, name='updatequiz')
]

