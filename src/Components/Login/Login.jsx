import { useState} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import style from './Login.module.css'

const Login = () => {
  //estado local para saber cuando el usurio presiono la opcion de <Remember me>
  const [rememberMe, setRememberMe] = useState(false)

  const handlerRemeberMe = (event)=>{
    setRememberMe(event.target.checked)
  }

  const [logInfo, setLogInfo]= useState({email: '', password: ''});

  const handleLoginChanges = (event)=>{
    const property = event.target.name;
    const value= event.target.value;

    setLogInfo({...logInfo, [property]: value})
  }

  const handlerLogIn = async(event)=>{
    event.preventDefault();
    const userData = {
      id:"2",
      data1:logInfo.email,
      data2:logInfo.password
    }
    try {
      const response = await axios.post(`http://localhost:8000/activateUser/`, userData)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className={style.fromContainer} >
      <div className={style.inputsContainer}>
          <input className={style.input} type='text' placeholder='Email address' name='email' value={logInfo.username} onChange={handleLoginChanges} />
          <input className={style.input} type='password' placeholder='Password' name='password' value={logInfo.password} onChange={handleLoginChanges}/>
      </div>

      <div className={style.otherStuffContainer}>
        <div className={style.rememberMe}>
          <input className={style.checkBox} type="checkbox" id="toggle-btn" onChange={handlerRemeberMe}/>
          <label className={style.checkBoxLabel} htmlFor="toggle-btn">Remember me</label>
        </div>
        <Link className={style.linkForgotPass}>
          Forgotten password?
        </Link>
      </div>

      <div className={style.loginContainer}>
        <button className={style.loginBtn} onClick={handlerLogIn} type='submit'>Log In</button>
        <div className={style.divider}>
          <div className={style.line}></div>
          <span className={style.dividerSpan}>Or</span>
          <div className={style.line}></div>
        </div>
        <button className={style.googleBtn} type='submit'> Sign in with Google </button>
      </div>

    </form>
  )
}

export default Login