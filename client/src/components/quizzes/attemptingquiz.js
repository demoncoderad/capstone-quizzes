import React, { useState, useEffect, Fragment } from 'react';
import ColoredLine from '../../misc/deco/horizontalrule';
import ToggleButon from '../../misc/quiz/togglebutton';
import AttemptQuiz from '../../views/app/attemptquiz';

const AttemptingQuiz = (props) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log('hi')
    let ques = props.quiz.questions;
    console.log(ques)
    let toptions = []
    ques.forEach((q, i) => {
      toptions.push([false, false, false, false]);
    })
    setOptions(toptions)
  }, [])

  const onOptionClick = (qindex, index) => {
    let cArr = options[qindex][index]
    let nArr = [false, false, false, false]
    nArr[index] = !cArr
    let toptions = [...options]
    toptions[qindex] = nArr


    setOptions(toptions)
  }

  
  return (
    <div>
      {loading === false && (
        <Fragment>
          
          <div>
          <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
          <b><p style={{float:'left'}}>{props.quiz.name} ---</p></b>
          <b><p style={{float:'left'}}>By {props.quiz.author.username} --- Category {props.quiz.category.name}</p></b>
          </div>
            {typeof options[0] !== 'undefined' && (<>
              
              {props.quiz.questions.map((ques, qindex) => {
                return (
                  <Fragment key={ques.id}>
                  <h4>Q: {ques.text}</h4>
                  {ques.options.map((option, index) =>
                    <ToggleButon key={option.id} BgColor={options[qindex][index] ? '#00FF00' : '#555555'} onClick={() => onOptionClick(qindex, index)} Value={option.text} />
                  )}
                  </Fragment>
                )
              })}  
              </>)}
              
            
          </div>
          <button onClick={function () {props.handleSubmit(options)}}>Submit</button>
          <div style={{clear:'both'}} >
          <ColoredLine color="black" />
          
          </div>
        </Fragment>
      )}
    </div>    
  );
};

export default AttemptingQuiz;