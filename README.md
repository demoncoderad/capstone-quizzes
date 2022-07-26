# CAPSTONE-QUIZZES

### How to Run:

1)Firstly make sure all dependencies listed in the requirements.txt inside the capstone/backend folder are installed by `pip install -r requirements.txt`.<br>
2) Also Make sure to goto capstone/client and run `npm install`.<br>
3)In the highest level of the project (the folder where this file resides), open two separate terminal windows/tabs. On one, go to capstone/backend and run `python manage.py runserver`, and in the other tab, go to capstone/client and run `npm start`. In order to use the web app, goto `localhost:3000`.<br>

**(The application was tested with Python 3.9.7 and Nodejs 12.22.6, but should work with a few older versions)**<br>

**I have also made an account that can be used to test. Username: 'CS50W_Capstone' , Password: 'quizzes'**

#### Major Technologies Used:
Node Js<br>
React Js<br>
Django<br>
Django-cors<br>
Django-rest-auth<br>
sqlite3<br>

## How to Use?

On the homepage, you can go to the dashboard, and browse quizzes, but if you do not have an account, you can register it with the signup/login button, and logout button for logging out.

On the dashboard, you can either `Browse All Quizzes`, `Browse By Category`, `Browse Your Quizzes`
The Categories are pre determined.<br>

On any page of browsing quiz, you can make a new quiz with `Create Quiz`. It requires its name, category, the name of 1st question, its 4 options, and the correct answer.<br>
If the quiz is yours, you can `Edit Quiz`, or `Add New Questions`<br>
Regardless if it's yours, you can `Attempt` the quiz.

You can select, de-select your options while attempting. Once attempted, press `Submit Quiz` and see the answers.

## Distinctiveness and Complexity - 
I believe `Quissez` is complex, and distinct enough for this submission. With the use of 5 total models, a few serializers, using reactjs, with handling multiple requests.
Compared to the previous projects, `Quissez` is completely different. This is an App where you aren't communicating and chatting, like Project 3,4, or having any transactions, or just being an informative source like project 2 and 1 respectively. You can put up trivias for others to solve for their fun.
During its course, I've faced numerous problems relating to requests, react, models and work arounds that I've never faced before. It has been complex enough for me to scratch my head for days long and just sit there, doing nothing.

### What does each file refer to:

**Directory: capstone/backend/quiz**<br>
models.py -> Contains the 4 main models of the application. The Categories, Quizzes, Questions, and Options.<br>
serializers.py -> Contains the needed serialziers for web requests throughout the app.<br>
urls.py -> Configures the URLs for making requests for function of the application.<br>
views.py -> Essential functions behind the URLs (Making new questions and quizzes, attempting quizzes etc.)<br>

**Directory: capstone/backend/quiz**<br>
This directory serves for authentication with the help of django-rest-auth.<br>

**Directory: capstone/client/src**<br>
App.js -> The main component of the react app and has all the routes configured for the same.<br>

**Directory: capstone/client/src/misc**<br>
deco/horizontalrule.js -> A Horizontal rule for the application completely black and smooth<br>
quiz/queryquiz.js -> For querying quizzes while browsing / attempting<br>
quiz/togglebutton.js -> A Toggle button used for attempting quizzes.<br>

**Directory: capstone/client/src/components**<br>
layout/navbar.js -> The Navbar at the top <br>
quizzes/attemptingquiz.js -> The main component for attempting a quiz and submitting it.<br>
quizzes/browsedquiz.js -> The main component for browsing the quizzes.<br>

**Directory: capstone/client/views**
auth/login.js -> Handles logging in<br>
auth/logout.js -> Handles Logging out<br>
auth/signup.js -> Handles Signingup<br>

app/activequiz.js -> Initializing attempting quiz<br>
app/attemptquiz.js -> Needed requests to be made<br>
app/categorybrowse.js -> A Selector for the Category to browse<br>
app/dashboard.js -> The Main dashboard to start browsing quizzes from<br>
app/editquiz.js -> Editting the quiz<br>
app/newques.js -> Making a new question<br>
app/newquiz.js -> Making a new quiz with a question<br>
app/quizbrowsecategory.js -> Main Browsing with categories<br>
app/quizbrowserall.js -> Browsing all quizzes<br>
app/quizbrowseuser.js -> Browse by Users<br>
app/viewscore.js -> View the result after attempting a quiz<br>

