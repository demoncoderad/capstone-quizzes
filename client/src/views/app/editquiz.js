import React, { useState, useEffect, Fragment } from 'react';

const EditQuiz = (props) => {
  const [loading, setLoading] = useState(true)

  const [quizname, setQuizName] = useState("")
  const [quizcategory, setQuizCategory] = useState("")
  const [quesnames, setQuesNames] = useState([])
  const [quesoptions, setQuesOptions] = useState([["First Option"]])
  const [correctoptions, setCorrectOptions] = useState([1])

  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/login');
    }
    const getCorrect = (q) => {
      q.options.forEach((o,i) => {
        if (o.correct === true) { return (i) }
      })
    }

    fetch ('http://127.0.0.1:8000/api/quiz/get/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(res => {
      setQuizCategory(res.categories[0])
      setCategories(res.categories);
    })


    const toEdit = JSON.parse(localStorage.getItem('toEdit'))

    fetch ('http://127.0.0.1:8000/api/quiz/get/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'option':0, 'id':toEdit.id})
    })
    .then (res => res.json())
    .then (res => {
      setQuizName(res.name)
      setQuizCategory(res.category.name)

      let tqn = []
      let tqo = []
      let tqco = []

      console.log(res.questions[0].options[0].text)

      res.questions.forEach((q, i) => {
        
        tqn.push(q.text)
        console.log(q.options)
        tqo.push(Array(q.options[0].text, q.options[1].text, q.options[2].text, q.options[3].text))
        tqco.push(getCorrect(q) == undefined ? 1 : getCorrect(q))

      })

      console.log(tqo)

      setQuesNames(tqn)
      setQuesOptions(tqo)
      setCorrectOptions(tqco)

      setLoading(false)
    })

    
    
    
  }, [])  

  const indexOfQO = () => {
    let x = correctoptions.map( value => value - 1 )
    console.log(x)
    return x
  }

  const editquiz = () => {

    const quiz = {
      'quizpk': JSON.parse(localStorage.getItem('toEdit')).id,
      'quizn': quizname,
      'quesn': quesnames,
      'quizc': quizcategory,
      'queso': quesoptions,
      'quesco': indexOfQO(),
      'userpk': localStorage.getItem('userpk')
    }

    fetch ('http://127.0.0.1:8000/api/quiz/update/quiz/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz)
    })
    .then(response => response.json())
    .then(res => {
      window.location.replace('http://localhost:3000/browsequiz/users/' + localStorage.getItem('userpk'))
    })

  }

  const newques = () => {
    window.location.replace('http://localhost:3000/newques')
  }

  const setOptions = (change, i, j) => {
    let qo = [...quesoptions];
    qo[i][j] = change;
    setQuesOptions(qo);
  }

  const setQName = (change, i) => {
    let qn = [...quesnames]
    qn[i] = change
    setQuesNames(qn)
  }

  const setQCorrectOption = (change, i) => {
    let qco = [...correctoptions]
    qco[i] = parseInt(change)
    setCorrectOptions(qco)
  }

  console.log(quesoptions)

  return (
    <div>
      {loading == false && (

        <>
        <form>
          <div style={{display:"inline-block"}}>
            <label>
              Quiz Name:
              <input
                name="quizname"
                type="text"
                value={quizname}
                onChange={e => setQuizName(e.target.value)}
                required />
            </label>
          </div>
          <br />

          <div style={{display:"inline-block"}}><label>
            Category:
            <select
              name="quizcategory"
              value={quizcategory}
              onChange={e => setQuizCategory(e.target.value)}
              required>
              {categories.map(category => (
                <option >{category}</option>
              ))}
            </select>
          </label>
          </div>
          <br />
          
          {quesnames.map((qn, i) => {
            return (
              <>
                <div style={{display:"inline-block"}}>
                  <label>
                    Question Name:
                    <input
                      name="quesname"
                      type="text"
                      value={qn}
                      onChange={e => setQName(e.target.value, i)}
                      required />
                  </label>
                </div>

                <br />

                {quesoptions[i].map((qo, j) => {
                  return (
                    <>
                      <div style={{display:"inline-block"}}>
                        <label>
                          Question Option {j+1}:
                          <input
                            name="quesopt1"
                            type="text"
                            value={qo}
                            onChange={e => setOptions(e.target.value, i, j)}
                            required />
                        </label>
                      </div>
                      
                      <br />
                    </>
                  )
                })}

                <div style={{display:"inline-block"}}>
                  <label>
                    Correct Option:
                    <select
                      name="correctopt"
                      value={correctoptions[i]}
                      onChange={e => setQCorrectOption(e.target.value, i)}
                      required>
                      {[1,2,3,4].map(opt => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <br />

              </>
            )
          })}

          

        </form>
        <button onClick={function() {editquiz();}}>Edit Quiz</button>
        <button onClick={function() {newques();}}>New Question</button>
        </>
      )}


    </div>
  );
};

export default EditQuiz;