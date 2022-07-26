from rest_framework.serializers import ModelSerializer
from .models import Category, Option, Quiz, Question
from users.serializers import UserSerializer

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('__all__')

class OptionSerializer(ModelSerializer):
    
    class Meta:
        model = Option
        fields = ['text', 'correct', 'id']

class QuestionSerializer(ModelSerializer):
    options = OptionSerializer(many=True, read_only=False)
    
    class Meta:
        model = Question
        fields = ['text', 'options', 'id']

class QuizSerializer(ModelSerializer):
    category = CategorySerializer(many=False, read_only=True)
    author = UserSerializer(many=False, read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ('__all__')

class QuizSerializerBrowse(ModelSerializer):
    category = CategorySerializer(many=False, read_only=True)
    author = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Quiz
        fields = ('category', 'name', 'author', 'id')

