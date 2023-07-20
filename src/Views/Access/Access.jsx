import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../Components/Login/Login";
import SignUp from "../../Components/Signup/Signup";
import style from "./Access.module.css"

//importando icon del boton cerrar
import close_button from "../../assets/icons/close_button.svg"

const Access = () => { 
    const [form, setForm] = useState('login');

    const handlerSwitchForms = (formName) => {
        setForm(formName)
    }

    return (
        <div className={style.accessContainer}>
            <div className={style.structure}>
                <Link to="/">
                    <img className={style.buttonClose} src={close_button} alt='x' />
                </Link>
                <div className={style.switchForms}>
                    <div 
                    className={form === 'login' ? style.switchFocus : style.switch}
                    onClick={()=>{handlerSwitchForms("login")}}
                    >
                        <h1 className={style.switchTitle}>LOG IN</h1>
                    </div>
                    <div 
                    className={form === 'singup' ? style.switchFocus : style.switch}
                    onClick={()=>{handlerSwitchForms("singup")}}
                    >
                        <h1 className={style.switchTitle}>SING UP</h1>
                    </div>
                </div>
                <div className={form === 'login' ? style.loginContainer : style.singupContainer}>
                    {form === 'login'
                    ?(<Login />)
                    :(<SignUp />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Access