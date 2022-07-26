const QueryQuiz = (data) => {
    return fetch ('http://127.0.0.1:8000/api/quiz/get/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

const QueryAllQuiz = () => {
  return fetch ('http://127.0.0.1:8000/api/quiz/get/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'option':1})
  })
}
export {QueryQuiz, QueryAllQuiz};