import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../Components/Login/Login";
import SignUp from "../../Components/Signup/Signup";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import style from "./Access.module.css"

//importando icon del boton cerrar
import close_button from "../../assets/icons/close_button.svg"

const Access = () => { 
    const navigate = useNavigate();
    
    const [form, setForm] = useState('login');
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    useEffect(() => {
    // Limpiar el mensaje de éxito después de 3 segundos
    const timer = setTimeout(() => {
        setSignUpSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
    }, [signUpSuccess]);
    
    
    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('changePass') && setForm('changePassword'));
        if(urlParams.get('requestChangePass') && setForm('requestChangePass'));

    },[])
    
    const handlerSwitchForms = (formName) => {
        setForm(formName)
    }
    //console.log(form);
    return (
        <>

        <div className={style.accessContainer}>

            <div className={style.structure}>
        {signUpSuccess && <p className={style.successMessage}><span className={style.validate}>validate your email</span>User created successfully</p>}
{/* ------------vista del componente para el cambio de contrasena */}
                {(form === 'requestChangePass' || form === 'changePassword') && 
                (<div className={style.changePasswordcontainer}>
                    <ChangePassword form={form} setForm={setForm}/>
                </div>
                )}

{/* ------------vista de los componentes login y signup */}
                {(form === 'login' || form === 'signup') &&
                (<>
                    <img className={style.buttonClose} src={close_button} alt='x' 
                    onClick={()=>{navigate(-1)}}/>
                    <div className={style.switchForms}>
                        <div 
                        className={form === 'login' ? style.switchFocus : style.switch}
                        onClick={()=>{handlerSwitchForms("login")}}
                        >
                            <h1 className={style.switchTitle}>LOG IN</h1>
                        </div>
                        <div 
                        className={form === 'signup' ? style.switchFocus : style.switch}
                        onClick={()=>{handlerSwitchForms("signup")}}
                        >
                            <h1 className={style.switchTitle}>SIGN UP</h1>
                        </div>
                    </div>
                    <div className={form === 'login' ? style.loginContainer : style.singupContainer}>
                        {form === 'login' && (<Login setForm={setForm}/>)}
                        {form === 'signup' && (<SignUp setForm={setForm} setSignUpSuccess={setSignUpSuccess}/>)}
                    </div>
                </>)}
            </div>
        </div>
        
        </>
    )
}

export default Access