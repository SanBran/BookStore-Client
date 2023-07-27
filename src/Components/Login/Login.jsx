import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import style from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { accessLogIn } from '../../redux/actions/actions';

const Login = ({ setForm }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [error, setError] = useState("")
  //estado local para saber cuando el usurio presiono la opcion de <Remember me>
  const [rememberMe, setRememberMe] = useState(false);

  const handlerRemeberMe = (event) => {
    setRememberMe(event.target.checked)
  }

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

  const handlerLogIn = async (event) => {
    event.preventDefault();
    try {
      await dispatch(accessLogIn(logInfo))
      setError("")
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form className={style.fromContainer} >
      <div className={style.inputsContainer}>
        {error.length ? (<p className={style.textError}>{error}</p>) : (<></>)}
        <input className={error.length ? (`${style.input} ${style.error}`) : (style.input)} type='text' placeholder='Email address' name='email' value={logInfo.username} onChange={handleLoginChanges} />
        <input className={error.length ? (`${style.input} ${style.error}`) : (style.input)} type='password' placeholder='Password' name='password' value={logInfo.password} onChange={handleLoginChanges} />
      </div>

      <div className={style.otherStuffContainer}>
        <div className={style.rememberMe}>
          <input className={style.checkBox} type="checkbox" id="toggle-btn" onChange={handlerRemeberMe} />
          <label className={style.checkBoxLabel} htmlFor="toggle-btn">Remember me</label>
        </div>
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
        <button className={style.googleBtn} type='submit'> Sign in with Google </button>
      </div>
    </form>
  )
}

export default Login