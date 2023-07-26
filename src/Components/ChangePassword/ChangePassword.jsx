import { useEffect, useState } from 'react';
//import style from './ChangePassword.Module.css';
import axios from 'axios';

import { expresions } from '../../utils/regex';
import { Link } from 'react-router-dom';
import style from './ChangePassword.module.css'

const ChangePassword = ({form, setForm})=>{
    const urlParams = new URLSearchParams(window.location.search);
    const valtokenPass = urlParams.get('token');

    const [sendEmail, setSendEmail] = useState(false);
    const [sendPass, setSendPass] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
        
    const [userData, setUserData]= useState({
        email: '',
        password: "",
        confirmPassword: "",

    });    

//-----------VALIDACIONES DEL FORMULARIO
    const validateInputs = (state, property) => {
        if(property === 'confirmPassword'){
            if (state.password !== state.confirmPassword) setErrors({ ...errors, [property]: 'Passwords do not match' })
            else setErrors({ ...errors, [property]: '' })
            return;
        }
        if (!expresions[property].test(state[property])) {
          switch (property) {
            case 'email': setErrors({ ...errors, [property]: 'Invalid email' })
              break;
            case 'password': setErrors({ ...errors, [property]: 'Password must be between 8-15 characters, lowercase, uppercase, numbers and special character' })
              break;
          }
        } else {
          switch (property) {
            case 'email': setErrors({ ...errors, [property]: '' })
              break;
            case 'password': setErrors({ ...errors, [property]: '' })
              break;
          }
        }
      }
//------------FIN DE LAS VALIDACIONES de inputs
    

    const handleChanges = (event)=>{
        const property = event.target.name;
        const value= event.target.value;

        setUserData({...userData, [property]: value})
        validateInputs({ ...userData, [property]: value }, property)
    }

    const BackLogIn = (event)=>{
        event.preventDefault();
        setForm('login')
    }

    const handleSubmitRequest = async(event)=>{
        event.preventDefault();
        const dataUser = {
            id:"3",
            data1:userData.email,
            data2: ''
        }
        try {
            console.log(dataUser);
            await axios.post(`http://localhost:8000/activateUser/`, dataUser)
    
            setUserData({...userData, email: ""})
            setSendEmail(true)
        } catch (error) {
            setErrors({...errors, email:error.response.data.text})
            console.log(error);
        }
    }

    const dataUser = {
        id:"4",
        data1:valtokenPass,
        data2:userData.password
    }
    console.log(dataUser);
    const handleSubmitChangePass = async(event)=>{
        event.preventDefault();
        const dataUser = {
            id:"4",
            data1:valtokenPass,
            data2:userData.password
        }
        try {
            console.log(dataUser);
            await axios.post(`http://localhost:8000/activateUser/`, dataUser)
    
            setUserData({...userData, 
            password: "",
            confirmPassword: "",
            })
            setSendPass(true)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className={style.formContainer}>
            <div className={style.backLogIn}>
                <Link onClick={BackLogIn}>{`<`} Back to Log in</Link>
            </div>
            { form === 'changePassword' &&
                (<>
                    {sendPass
                    ?(<h5 className={style.message}>Se cambio la contrasena exitosamente</h5>)
                    :(<>
                        <div className={style.titleContainer}>
                            <h1 className={style.title}>CHANGE PASSWORD</h1>
                        </div>
                        
                        <div className={style.inputsContainer}>
                            <input
                            className={errors.password.length ? (`${style.input} ${style.error}`) : style.input}
                            name="password"
                            onChange={handleChanges}
                            value={userData.password}
                            type="password"
                            placeholder="Password"
                            required
                            />
                            {errors.password.length ? <p className={style.textError}>{errors.password}</p> : <></>}

                            <input
                            className={errors.confirmPassword.length ? (`${style.input} ${style.error}`) : style.input}
                            name="confirmPassword"
                            onChange={handleChanges}
                            value={userData.confirmPassword}
                            type="password"
                            placeholder="Confirm password"
                            required
                            />
                            {errors.confirmPassword.length ? <p className={style.textError}>{errors.confirmPassword}</p> : <></>}
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.submitBtn} onClick={handleSubmitChangePass}>Change Password</button>
                        </div>
                    </>)
                    
                    }
                </>)
            }
            {form === 'requestChangePass' && 
                (<>
                    {sendEmail
                    ?(<h5 className={style.message}>Revisa tu mail para cambiar la contrasena</h5>)
                    :(<>
                    <div className={style.titleContainer}>
                        <h1 className={style.title}>Request password change</h1>
                    </div>
                    
                    <div className={style.inputsContainer}>
                        <input className={errors.email.length ? (`${style.input} ${style.error}`) : style.input} 
                        type='text' 
                        placeholder='Email address' 
                        name='email' 
                        value={userData.email} onChange={handleChanges} />
                        {errors.email.length ? <p className={style.textError}>{errors.email}</p> : <></>}

                    </div>
                    <div className={style.buttonContainer}>
                        <button className={style.submitBtn} onClick={handleSubmitRequest}>Send request</button>
                    </div>
                    </>)
                    }
                </>)
            }
        </form>
    )
};

export default ChangePassword;