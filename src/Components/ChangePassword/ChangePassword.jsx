import { useState } from 'react';
import style from './ChangePassword.Module.css';

const ChangePassword = ({setForm})=>{
    const [send, setSend] = useState(false)

    const [userID, setUserID]= useState({email: ''});    

    const handleChanges = (event)=>{
        const property = event.target.name;
        const value= event.target.value;

        setLogInfo({...logInfo, [property]: value})
    }

    const BackLogIn = (event)=>{
        event.preventDefault();
        setForm('login')
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
    }

    return (
        <form className={style.formContainer}>
            <div className={style.buttonContainer}>
                <button onClick={BackLogIn}>Back to Log in</button>
            </div>

            { send 
            ?(<>Revisa tu mail para cambiar la contrasena</>)
            :(<>
            <div>
                <h1>CHANGE PASSWORD</h1>
            </div>
            
            <div className={style.inputsContainer}>
                <input className={style.input} 
                type='text' 
                placeholder='Email address' 
                name='email' 
                value={userID.email} onChange={handleChanges} />
            </div>
            <div className={style.buttonContainer}>
                <button onClick={handleSubmit}>Send request</button>
            </div>
            </>)
            }
        </form>
    )
};

export default ChangePassword;