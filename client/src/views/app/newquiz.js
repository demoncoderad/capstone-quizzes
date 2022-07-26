import React, { useState, useEffect, Fragment } from 'react';

const NewQuiz = (props) => {
  const [loading, setLoading] = useState(true);

  const [quizname, setQuizName] = useState("")
  const [quizcategory, setQuizCategory] = useState("")
  const [quesname, setQuesName] = useState("")
  const [quesoptions, setQuesOptions] = useState(["First Option"])
  const [correctoption, setCorrectOption] = useState(0)

  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/login');
    }

    fetch ('http://127.0.0.1:8000/api/quiz/get/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(res => {
      console.log(res)
      setQuizCategory(res.categories[0])
      setCategories(res.categories);
    })
  }, [])  

  const makequiz = () => {
    const quiz = {
      'quizn': quizname,
      'quizc': quizcategory,
      'quesn': [quesname],
      'queso': quesoptions,
      'quesco': quesoptions.indexOf(correctoption),
      'userpk': localStorage.getItem('userpk')
    }

    fetch ('http://127.0.0.1:8000/api/quiz/create/quiz/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz)
    })
    .then(response => response.json())
    .then(res => {
      window.location.replace('http://localhost:3000/browsequiz/all')
    })

  }

  const setOptions = (change, i) => {
    let qo = [...quesoptions];
    qo[i] = change;
    setQuesOptions(qo);
  }

  return (
    <div>

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
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        </div>
        <br />

        <div style={{display:"inline-block"}}>
        <label>
          First Question Name:
          <input
            name="fquesname"
            type="text"
            value={quesname}
            onChange={e => setQuesName(e.target.value)}
            required />
        </label>
        </div>
        <br />

        <div style={{display:"inline-block"}}>
        <label>
          Question Option 1:
          <input
            name="quesopt1"
            type="text"
            value={quesoptions[0]}
            onChange={e => setOptions(e.target.value, 0)}
            required />
        </label>
        </div>
        <br />

        <div style={{display:"inline-block"}}>
        <label>
          Question Option 2:
          <input
            name="quesopt1"
            type="text"
            value={quesoptions[1]}
            onChange={e => setOptions(e.target.value, 1)}
            required />
        </label>
        </div>
        <br />

        <div style={{display:"inline-block"}}>
        <label>
          Question Option 3:
          <input
            name="quesopt1"
            type="text"
            value={quesoptions[2]}
            onChange={e => setOptions(e.target.value, 2)}
            required />
        </label>
        </div>
        <br />

        <div style={{display:"inline-block"}}>
        <label>
          Question Option 4:
          <input
            name="quesopt1"
            type="text"
            value={quesoptions[3]}
            onChange={e => setOptions(e.target.value, 3)}
            required />
        </label>
        </div>
        <br />

        <div style={{display:"inline-block"}}>
        <label>
          Correct Option:
          <select
            name="correctopt"
            value={correctoption}
            onChange={e => setCorrectOption(e.target.value)}
            required>
            {[1,2,3,4].map(opt => (
              <option key={opt}>{quesoptions[opt-1]}</option>
            ))}
          </select>
        </label>
        </div>

      </form>

      <button onClick={function() {makequiz();}}>Create Quiz</button>

    </div>
  );
};

export default NewQuiz;