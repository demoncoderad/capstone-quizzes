from typing import Text
from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=256)

class Quiz(models.Model):
    name = models.CharField(max_length=128)
    category = models.ForeignKey(Category, on_delete=models.SET_DEFAULT, related_name='quizzes'
                , default=1)
    author = models.ForeignKey('users.user', on_delete=CASCADE, related_name='quizzes')

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=CASCADE, related_name='questions')
    text = models.CharField(max_length=256)

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=CASCADE, related_name='options')

    text = models.CharField(max_length=192)
    correct = models.BooleanField()