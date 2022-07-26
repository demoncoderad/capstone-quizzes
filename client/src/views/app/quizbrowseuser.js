import React, { useState, useEffect, Fragment } from 'react';
import BrowsedQuiz from '../../components/quizzes/browsedquiz';
import { QueryQuiz } from '../../misc/quiz/queryquiz'

const BrowseUserQuizzes = (props) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState()

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/login');
    }

    const datafetch = QueryQuiz({'option':2, 'id':props.match.params.id});
    datafetch.then(res => res.json()).then(data => {
      setResult(data)
      setLoading(false)
    });
  }, [])

  return (
    <div>
      <center>
        <h1> Quizzes </h1>

        <button onClick={function() {window.location.replace('http://localhost:3000/newquiz')}}>CREATE NEW</button>

        
      </center>
      {loading === false && (
        <Fragment>
          {result.map((quiz, index) =>
            <>
            <BrowsedQuiz key={quiz.id} quiz={quiz}/>
            </>
          )}         
        </Fragment>
      )}
    </div>
  );
};

export default BrowseUserQuizzes;