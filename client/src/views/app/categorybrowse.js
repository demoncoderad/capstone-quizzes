import React, { useState, useEffect, Fragment } from 'react';
import BrowsedQuiz from '../../components/quizzes/browsedquiz';
import { QueryQuiz } from '../../misc/quiz/queryquiz'
import BrowseCategory from './quizbrowsecategory';

const SelectCategory = (props) => {

  const [loading, setLoading] = useState(true)

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

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
      setCategories(res.categories);
      setCurrentCategory(res.categories[0])

      setLoading(false)
    })
  }, [])

  return (
    <div>
      {loading == false && (
        <>
        <center>        
          <h1> Quizzes </h1>
  
          <button onClick={function() {window.location.replace('http://localhost:3000/newquiz')}}>CREATE NEW</button>
  
          <h2> BY CATEGORY :</h2>
  
          <label>
            <select
              name="category"
              onChange={e => setCurrentCategory(e.target.value)}
              required>
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </center>
        <BrowseCategory category={currentCategory} />
        </>
      )}
      
    </div>
  );
};

export default SelectCategory;