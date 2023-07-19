import { useState } from "react";
import Login from "../../Components/Login/Login";
import SignUp from "../../Components/Signup/Signup";
import style from "./Access.module.css"

const Access = () => { 
    const [form, setForm] = useState('login');

    const handlerSwitchForms = (formName) => {
        setForm(formName)
    }

    return (
        <div className={style.accessContainer}>
            <div className={style.structure}>
                {/* cambiar a img con el icon despues */}
                <button>x</button>
                <div className={style.switchForms}>
                    <div 
                    className={style.switchLogIn}
                    onClick={()=>{handlerSwitchForms("login")}}
                    >
                        <h1>LOG IN</h1>
                    </div>
                    <div 
                    className={style.switchSingUp}
                    onClick={()=>{handlerSwitchForms("singup")}}
                    >
                        <h1>SING UP</h1>
                    </div>
                </div>
                <div className={style.formContainer}>
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