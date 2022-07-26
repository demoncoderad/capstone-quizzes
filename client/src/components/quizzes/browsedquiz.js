import React, { useState, useEffect, Fragment } from 'react';
import ColoredLine from '../../misc/deco/horizontalrule';
import ToggleButon from '../../misc/quiz/togglebutton';
import { Link, Redirect } from 'react-router-dom';
import { QueryQuiz } from '../../misc/quiz/queryquiz';


const BrowsedQuiz = (props) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([false, false, false, false]);
  const [choiceColor, setChoiceColor] = useState(['gray', 'gray', 'gray', 'gray']);

  const onOptionClick = (index) => {
    let cArr = options[index]
    let nArr = [false, false, false, false]
    nArr[index] = !cArr
    let ccArr = []
    nArr.forEach((ccB, i) => {
      ccArr.push(ccB ? '#00FF00' : 'gray');
    })

    console.log(ccArr)

    setOptions(nArr)
    setChoiceColor(ccArr)
  
    console.log(choiceColor[index])
  }
  
  function attemptQuiz(id) {
    localStorage.setItem('attemptQuizID', id)
    console.log(id)
    //return(<Redirect to='http://localhost:3000/attemptquiz'/>)
    window.location.replace('http://localhost:3000/attemptquiz')
  }

  const editQuiz = () => {
    

      localStorage.setItem('toEdit', JSON.stringify(props.quiz))
    
      window.location.replace('http://localhost:3000/editquiz')
    
  }

  const addQues = () => {
    localStorage.setItem('toEdit', JSON.stringify(props.quiz))
    window.location.replace('http://localhost:3000/newques')
  }

  let xhref = "http://localhost:3000/browsequiz/users/" + props.quiz.author.id
  let xhref2 = "http://localhost:3000/browsequiz/categories"
  return (
    <div>
      {loading === false && (
        <Fragment>
          
          <div>
          <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
          <b><p style={{float:'left'}}>{props.quiz.name} ---</p></b>
          
          <b><p style={{float:'left'}}><a href={xhref}>By {props.quiz.author.username}</a>---</p></b>
          <b><p style={{float:'left'}}><a href={xhref2}>Category: {props.quiz.category.name}</a></p></b>
          {localStorage.getItem('userpk') == props.quiz.author.id && (
            <>
            <button onClick={function () {editQuiz()}}>EDIT QUIZ</button>
            <button onClick={function () {addQues()}}>ADD QUESTION</button>
            </>
          )}          
          <button onClick={function () {attemptQuiz(props.quiz.id)}}>ATTEMPT</button>
          </div>
            {typeof props.quiz.questions !== "undefined" && (
              <>
              {props.quiz.questions.map((ques, index) => {
                return (
                  <Fragment key={ques.id}>
                  <h4>Q: {ques.text}</h4>
                  {ques.options.map((option, index) => 
                    <ToggleButon key={option.id} BgColor={choiceColor[index]} onClick={() => onOptionClick(index)} Value={option.text} />
                  )}
                  </Fragment>
                )
              })}  
              </>
            )}
            
          </div>
          <div style={{clear:'both'}} >
          <ColoredLine color="black" />
          </div>
        </Fragment>
      )}
    </div>    
  );
};

export default BrowsedQuiz;