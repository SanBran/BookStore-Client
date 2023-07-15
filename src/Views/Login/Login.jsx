//import React from 'react'
import { useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {

  const [logInfo, setLogInfo]= useState({username: '', password: ''});

  const handleLoginChanges = (event)=>{
    event.preventDefault();
    const property = event.target.name;
    const value= event.target.value;

    setLogInfo({...logInfo, [property]: value})
  }
  return (
    <form >Login
<div>
  <span> Do you want to Sign up?</span>
  <Link to={'/signup'}> Here to Sign Up</Link>
</div>
      <div>
        <input type='text' name='usernameOrEmail' value={logInfo.username} onChange={handleLoginChanges} />
      </div>

      <div>
        <input type='text' name='password' value={logInfo.password} onChange={handleLoginChanges}/>
      </div>

      <div>
        <button type='submit'>Log In</button>
      </div>

      <div>
        <span>Or</span>
      </div>
      <div>
        <button type='submit'> Sign In With Google </button>
      </div>

    </form>
  )
}

export default Login