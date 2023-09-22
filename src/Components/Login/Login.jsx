import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import style from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { accessLogIn, obtainToken } from '../../redux/actions/actions';

//importaciones para login con google
import { accessGoogle } from '../../redux/actions/actions';
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import Cookies from 'js-cookie';


const Login = ({ setForm }) => {
 

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [error, setError] = useState("")
  //estado local para saber cuando el usurio presiono la opcion de <Remember me>
  // const [rememberMe, setRememberMe] = useState(false);

  // const handlerRemeberMe = (event) => {
  //   setRememberMe(event.target.checked)
  // }

  //-------SOLICITUD CAMBIO DE CONTRASENA
  const handleForgotPass = (event) => {
    event.preventDefault();
    setForm('requestChangePass')
  }
  //-------FIN DE CAMBIO DE CONTRASENA

  const [logInfo, setLogInfo] = useState({ email: '', password: '' });


  const handleLoginChanges = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setLogInfo({ ...logInfo, [property]: value })
  }

//-----LOGIN DESDE EL FORMULARIO
  const handlerLogIn = async (event) => {
    event.preventDefault();
    try {
      await dispatch(accessLogIn(logInfo));
      setError("");
      const token = await dispatch(obtainToken(logInfo))
      localStorage.setItem('token', JSON.stringify(token));
      Cookies.set('valToken', token);
      Cookies.set('email', logInfo.email);
      

      navigate('/');
    } catch (error) {
      setError(error.message)
    }
  }

//-----LOGIN CON GOOGLE
//---Pasar a un .env del front
//---------clientID para usar en el localhost:3000
const clientID = "637027522589-6jbd17n7qelc1mqtp4c1gl43lvjp57cf.apps.googleusercontent.com";
//---------clientID para usar en el https://book-store-client-coral.vercel.app/
  // const clientID = "637027522589-j7nin8g8gico6g5hsfkkg98u2r4gfbj6.apps.googleusercontent.com";s

  const responseGoogle = async (response) => {
    const user = jwt_decode(response.credential);
    try {
      const token = await dispatch(accessGoogle(user));
      localStorage.setItem('token', JSON.stringify(token));
      setError("");
      Cookies.set('valToken', token);
      Cookies.set('email', user.email);

      navigate('/');
    } catch (error) {
      setError(error.message)
    }
  }
  const onFailure = (error) => {
    console.log(error);
  };
   
  return (
    <form className={style.fromContainer} >
      <div className={style.inputsContainer}>
        {error.length ? (<p className={style.textError}>{error}</p>) : (<></>)}
        <input className={error.length ? (`${style.input} ${style.error}`) : (style.input)} type='text' placeholder='Email address' name='email' value={logInfo.username} onChange={handleLoginChanges} />
        <input className={error.length ? (`${style.input} ${style.error}`) : (style.input)} type='password' placeholder='Password' name='password' value={logInfo.password} onChange={handleLoginChanges} />
      </div>

      <div className={style.otherStuffContainer}>
        {/* <div className={style.rememberMe}>
          <input className={style.checkBox} type="checkbox" id="toggle-btn" onChange={handlerRemeberMe} />
          <label className={style.checkBoxLabel} htmlFor="toggle-btn">Remember me</label>
        </div> */}
        <Link onClick={handleForgotPass} className={style.linkForgotPass}>
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
        <div className={style.googleContainer}>
          <GoogleLogin
            clientId={clientID}
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={onFailure}
          />
        </div>
      </div>
    </form>
  )
}

export default Login