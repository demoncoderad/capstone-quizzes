import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';

import Login from './views/auth/login';
import Signup from './views/auth/signup';
import Logout from './views/auth/logout';
import Dashboard from './views/app/dashboard';
import QuizBrowserAll from './views/app/quizbrowserall';
import ActiveQuiz from './views/app/activequiz';
import ViewScore from './views/app/viewscore';
import NewQuiz from './views/app/newquiz';
import SelectCategory from './views/app/categorybrowse';
import BrowseUserQuizzes from './views/app/quizbrowseuser';
import EditQuiz from './views/app/editquiz';
import NewQues from './views/app/newques';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
          <Route path='/logout' component={Logout} exact />
          <Route path='/dashboard' component={Dashboard} exact />
          <Route path='/browsequiz/all' component={QuizBrowserAll} exact/>
          <Route path='/attemptquiz' component={ActiveQuiz} exact/>
          <Route path='/score' component={ViewScore}/>
          <Route path='/newquiz' component={NewQuiz}/>
          <Route path='/editquiz' component={EditQuiz} />
          <Route path='/newques' component={NewQues} />
          <Route path='/browsequiz/categories' component={SelectCategory} />
          <Route path='/browsequiz/users/:id' component={BrowseUserQuizzes} />
        </Switch>
      </Router>
    </div>
  );
};



export default App;