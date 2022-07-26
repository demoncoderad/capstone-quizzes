import React, { useState, useEffect, Fragment } from 'react';
import ToggleButon from '../../misc/quiz/togglebutton';
import ColoredLine from '../../misc/deco/horizontalrule';

const ViewScore = (props) => {    

  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [gquiz, setGQuiz] = useState([]);
  const [noscore, setNoScore] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/login');
    }

    if (localStorage.getItem('currentQuiz') === null || localStorage.getItem('score') === null){
      setNoScore(true);
    }
    else{

      let quiz = JSON.parse(localStorage.getItem('currentQuiz'));
      
      let ques = quiz.questions
      let toptions = []
      toptions = ques.map(q => ['#555555', '#555555', '#555555', '#555555', q.options[0].id, q.options[1].id, q.options[2].id, q.options[3].id])

      let score = JSON.parse(localStorage.getItem('score'))

      toptions.forEach((toption, i) => {

        console.log(toption);

        Array.from(toption).forEach((toptio, j) => {
          
          toptions[i][score[1][i]] = '#FF0000'
          if (Array.from(toption).indexOf(score[0].correct[i]) > -1) {
            toptions[i][Array.from(toption).indexOf(score[0].correct[i]) - 4] = '#00FF00'
          }
        });
      });

      console.log(toptions)

      setOptions(toptions)
      setLoading(false)
      setGQuiz(quiz)
    }
    

  }, [])

  let score = JSON.parse(localStorage.getItem('score'))
  console.log(score)

  const reattempt = () => {
    localStorage.removeItem('score')
    localStorage.removeItem('currentQuiz')

    window.location.replace('http://localhost:3000/attemptquiz');
  }

  const resetandhome = () => {
    localStorage.removeItem('score')
    localStorage.removeItem('currentQuiz')

    window.location.replace('http://localhost:3000/')
  }

  if (noscore) return( <h1>NO SCORE TO BE FOUND!</h1> )

  return (
    
    <div>
      {loading === false && (
      
        <Fragment>
          
          <div>
          <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
          <b><p style={{float:'left'}}>{gquiz.name} ---</p></b>
          <b><p style={{float:'left'}}>By {gquiz.author.username} --- Category {gquiz.category.name}</p></b>
          </div>

          <center><b><h3>SCORE: {score[0].score}</h3></b></center>
            
              
              {gquiz.questions.map((ques, qindex) => {
                return (
                  <Fragment key={ques.id}>
                  <h4>Q: {ques.text}</h4>
                  <h4>{score[0].score_list[qindex]}/1</h4>
                  {ques.options.map((option, index) =>
                    <ToggleButon key={option.id} BgColor={options[qindex][index]} Value={option.text} />
                  )}
                  </Fragment>
                )
              })}  
            
              
            
          </div>
          <div style={{clear:'both'}} >
          <ColoredLine color="black" />
          
          <button onClick={function() {reattempt();}}> Reattempt </button>
          <button onClick={function() {resetandhome();}}>Clear Score and Return Home</button>
          </div>
        </Fragment>
      )}
      
    </div>    
  );
}

export default ViewScore