import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/login');
    } else {
      fetch('http://127.0.0.1:8000/api/users/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('userpk', data.pk)
          setUserName(data.username);
          setLoading(false);
        });
    }

    
  }, []);

  const yourquiz = '/browsequiz/users/'+localStorage.getItem('userpk')

  return (
    <div>
      {loading === false && (
        <Fragment>
          <h1>Dashboard</h1>
          <h2>Hello {userName}!</h2>
          <Link to='/browsequiz/all'>Browse All Quiz</Link>
          <br />
          <Link to='/browsequiz/categories'>Browse All Quiz By Category</Link>
          <br />
          <Link to={yourquiz}>Your Quizzes</Link>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;