import React, { useState, useEffect, Fragment } from 'react';
import AttemptingQuiz from '../../components/quizzes/attemptingquiz';
import BrowsedQuiz from '../../components/quizzes/browsedquiz';
import { QueryQuiz } from '../../misc/quiz/queryquiz'
import { useLocation, Redirect } from 'react-router-dom'

const AttemptQuiz = (props) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState()
  const [ID, setID] = useState(1)

  useEffect(() => {
    setID(props.id)

    const datafetch = QueryQuiz({'option':0,'id':props.id});
    datafetch.then(res => res.json()).then(data => {
      setResult(data)
      setLoading(false)
    });
  }, [])

  const handleSubmit = (options) => {
    setLoading(true)

    const answers = [];
    options.forEach(opt => {
      answers.push(opt.indexOf(true))
    });

    fetch ('http://127.0.0.1:8000/api/quiz/submit/', {
      'method': 'POST',
      headers: {
        'Content-Type': 'applicaiton/json'
      },
      body: JSON.stringify({'id': ID, 'answers':answers})
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('score', JSON.stringify([data, answers]))
      localStorage.setItem('currentQuiz', JSON.stringify(result))
      window.location.replace('http://localhost:3000/score');
    })
  }


  return (
    <div>
      <center>
        <h1> Quizzes </h1>
        <h2> All </h2>
      </center>
      {loading === false && (
        <Fragment>
          <AttemptingQuiz handleSubmit={handleSubmit} key={result.id} quiz={result}/>
        </Fragment>
      )}
    </div>
  );
};

export default AttemptQuiz;