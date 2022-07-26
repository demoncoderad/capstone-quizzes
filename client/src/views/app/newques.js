import React, { useState, useEffect, Fragment } from 'react';

const NewQues = (props) => {
  const [loading, setLoading] = useState(true)

  const [quizname, setQuizName] = useState("")
  const [quizcategory, setQuizCategory] = useState("")
  const [quesname, setQuesName] = useState()
  const [quesoptions, setQuesOptions] = useState(["First Option", "", "", ""])
  const [correctoption, setCorrectOption] = useState(1)

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/login');
    }


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

      setLoading(false)
    })

    
    
    
  }, [])

  const makeques = () => {

    const quiz = {
      'quizid': JSON.parse(localStorage.getItem('toEdit')).id,
      'quesn': quesname,
      'queso': quesoptions,
      'quesco': correctoption-1
    }

    fetch ('http://127.0.0.1:8000/api/quiz/create/ques/', {
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

  const setOptions = (change, i) => {
    let qo = [...quesoptions];
    qo[i] = change;
    setQuesOptions(qo);
  }

  const setQName = (change) => {
    setQuesName(change)
  }

  const setQCorrectOption = (change) => {
    setCorrectOption(parseInt(change))
  }

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
                disabled="true"
                required />
            </label>
          </div>
          <br />

          <div style={{display:"inline-block"}}><label>
            Category:
            <input 
              name="category"
              type="text"
              value={quizcategory}
              disabled="true" />
          </label>
          </div>
          <br />
          
              <>
                <div style={{display:"inline-block"}}>
                  <label>
                    Question Name:
                    <input
                      name="quesname"
                      type="text"
                      value={quesname}
                      onChange={e => setQName(e.target.value)}
                      required />
                  </label>
                </div>

                <br />

                {quesoptions.map((qo, j) => {
                  return (
                    <>
                      <div style={{display:"inline-block"}}>
                        <label>
                          Question Option {j+1}:
                          <input
                            name="quesopt"
                            type="text"
                            value={qo}
                            onChange={e => setOptions(e.target.value, j)}
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
                      value={correctoption}
                      onChange={e => setQCorrectOption(e.target.value)}
                      required>
                      {[1,2,3,4].map(opt => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <br />

              </>
            

          

        </form>
        <button onClick={function() {makeques();}}>Create Question</button>
        </>
      )}


    </div>
  );
};

export default NewQues;