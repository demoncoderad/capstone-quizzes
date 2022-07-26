import React, { useState, useEffect, Fragment } from 'react';
import BrowsedQuiz from '../../components/quizzes/browsedquiz';
import { QueryQuiz } from '../../misc/quiz/queryquiz';
import AttemptQuiz from './attemptquiz';
import { useParams, Redirect } from 'react-router-dom'

const ActiveQuiz = ({props}) => {

  const [loading, setLoading] = useState(false);
  const pk = localStorage.getItem('attemptQuizID')
  useEffect(() => {
    console.log('hi')
    if (localStorage.getItem('token') === null) {
      return (<Redirect to='/login'/>)
    }
  }, [])
  return (
    <div>
      {loading === false && (
        <Fragment>
          <AttemptQuiz id={pk} />
        </Fragment>
      )}
    </div>    
  );
};

export default ActiveQuiz;