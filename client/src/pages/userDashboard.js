import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/home.css'

export const UserDashboard = () => {

  const navigate = useNavigate();
  
  if (!localStorage.getItem('userEmail')) {
    localStorage.clear();
    navigate('/login');
  }
  
  const userEmail = localStorage.getItem('userEmail');
  
  function handleLogoutRequest(event) {
    event.preventDefault();
    
    axios.post('/api/auth/logout', {}, {
      withCredentials: true,
    })
    .then((response) => {

      if (response.status === 200) {
        localStorage.clear();
        navigate('/login');
      }
    }, (err) => {
      localStorage.clear();
      console.log(err);
    });
  }

  return (
    <div className='homeDisplay'>
      <h1>User Logged In.</h1>
      <hr/>
      <div className="row">
        <div>
          <h6 className="fieldDescription">Email</h6>
        </div>
        <div className="fieldValue">
          {userEmail}
        </div>
      </div>
      <hr/>
      <form onSubmit={handleLogoutRequest} className='logoutForm'>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}