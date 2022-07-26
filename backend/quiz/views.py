import json
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.fields import empty
from .models import Option, Quiz, Question, Category
from django.views.decorators.csrf import csrf_exempt
from users.models import User
from .serializers import QuizSerializer, QuestionSerializer, CategorySerializer, QuizSerializerBrowse

def GetCorrectAnswers(QuestionList):
    x = []
    for q in Question.objects.filter(quiz=QuestionList):
        x.append(Option.objects.get(question = q, correct=True).id)
    return x

@csrf_exempt
def getQuiz(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        if body.get('option') == 0:
            id = body.get('id')
            queriedquiz = Quiz.objects.get(pk=id)
            quizdata = QuizSerializer(queriedquiz).data

            return JsonResponse(quizdata, safe=False)
        elif body.get('option') == 1:
            queriedquiz = Quiz.objects.all()
            quizdata = QuizSerializerBrowse(queriedquiz, many=True).data

            return JsonResponse(quizdata, safe=False)
        elif body.get('option') == 2:
            id = body.get('id')
            queriedquiz = Quiz.objects.filter(author__pk=id)
            quizdata = QuizSerializerBrowse(queriedquiz, many=True).data

            return JsonResponse(quizdata, safe=False)
        elif body.get('option') == 3:
            queriedquiz = Quiz.objects.filter(category__name = body.get('category'))
            quizdata = QuizSerializerBrowse(queriedquiz, many=True).data

            return JsonResponse(quizdata, safe=False)

@csrf_exempt
def getCategories(request):
    if request.method == 'POST':
        AllCats = Category.objects.all()
        categories = list(AllCats.values_list('name', flat=True))
        print(categories)

        return JsonResponse({'categories': categories}, safe=False)


@csrf_exempt
def createQuiz(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        print(body)

        quizn = body.get('quizn')
        quizc = body.get('quizc')
        quesn = body.get('quesn')
        queso = body.get('queso')
        quesco = body.get('quesco')
        print('quesco')

        quiz = Quiz.objects.create(name=quizn, category=Category.objects.get(name=quizc), author=User.objects.get(pk=body.get('userpk')))
        ques = Question.objects.create(text=quesn, quiz=quiz)
        options = []
        for idx, opt in enumerate(queso):
            o = Option.objects.create(question=ques, text=opt, correct=idx==quesco)
            options.append(o)

        return JsonResponse({'quesid': ques.id, 'quizid':ques.quiz.id})

@csrf_exempt
def updateQuiz(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        quizpk = body.get('quizpk')
        quizn = body.get('quizn')
        quizc = body.get('quizc')
        quesn = body.get('quesn')
        queso = body.get('queso')
        quesco = body.get('quesco')

        quiz = Quiz.objects.get(pk = quizpk)
        quiz.name = quizn
        quiz.category = Category.objects.get(name=quizc)
        quiz.save()
        print(quesco)
        for i, qs in enumerate(Question.objects.filter(quiz__id=quizpk)):
            qs.text = quesn[i]
            qs.save()
            for j, qo in enumerate(Option.objects.filter(question__id=qs.pk)):
                print(queso)
                qo.text = queso[i][j]
                qo.correct = j == quesco[i]
                qo.save()

        return JsonResponse({"success": "200"})



@csrf_exempt
def createQues(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        quizid = body.get('quizid')
        quesn = body.get('quesn')
        queso = body.get('queso')
        quesco = body.get('quesco')

        quiz = Quiz.objects.get(id=quizid)
        ques = Question.objects.create(text=quesn, quiz=quiz)

        for idx, opt in enumerate(queso):
            Option.objects.create(question=ques, text=opt, correct=idx==quesco)

        return JsonResponse({'quesid': ques.id, 'quizid':ques.quiz.id})





@csrf_exempt
def attemptQuiz(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        anses = body.get('answers')
        quizQuery=Quiz.objects.get(pk=int(body.get('id')))
        quiz = dict(QuizSerializer(quizQuery, many=False).data)
        print(quiz)
        if len(anses) > len(quiz['questions']):
            return JsonResponse({'code':0,'msg':'ERROR! NOT ENOUGH ANSWERS'})

        score = 0
        scorel = []
        print(anses)
        for i,ans in enumerate(anses):
            if quiz['questions'][i]['options'][ans]['correct']:
                score += 1
            scorel.append(int(quiz['questions'][i]['options'][ans]['correct']))

        return JsonResponse({'score':score, 'score_list': scorel, 'correct': GetCorrectAnswers(quizQuery)})
