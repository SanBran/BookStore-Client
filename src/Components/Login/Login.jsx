import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import style from './Login.module.css'
import { useDispatch, useSelector} from 'react-redux';
import { accessUser } from '../../redux/actions/actions';

const Login = () => {
  const access = useSelector(state=>state.access)

  const navigate = useNavigate()

  const dispatch = useDispatch();
  //estado local para saber cuando el usurio presiono la opcion de <Remember me>
  const [rememberMe, setRememberMe] = useState(false);

  const handlerRemeberMe = (event)=>{
    setRememberMe(event.target.checked)
  }

  const [userState, SetUserState] = useState({
    state: false,
    text:''
  })

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
      //PASAR A REDUX
      const response = await axios.post(`http://localhost:8000/activateUser/`, userData)
      //console.log(response.data);
      navigate('/')
      return(dispatch(accessUser(true, response.data.detail.id)))
    } catch (error) {
      console.log(error.response.data.text);
      return(dispatch(accessUser(false, error.response.data.text)))
    }
  }

  return ( 
    <form className={style.fromContainer} >
      <div className={style.inputsContainer}>
          {!access.state && access.ref.length ? (<p className={style.textError}>{access.ref}</p>):(<></>)}
          <input className={access.ref.length ?(`${style.input} ${style.error}`) :(style.input)} type='text' placeholder='Email address' name='email' value={logInfo.username} onChange={handleLoginChanges} />
          <input className={access.ref.length ?(`${style.input} ${style.error}`) :(style.input)} type='password' placeholder='Password' name='password' value={logInfo.password} onChange={handleLoginChanges}/>
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