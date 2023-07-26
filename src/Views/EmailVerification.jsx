import { useEffect, useState } from "react"
//import { useDispatch } from "react-redux";
//import { activateUser } from "../redux/actions/actions"; 

import { useNavigate } from "react-router-dom";

import axios from "axios";

const EmailVerification = ()=>{
    const [validate, setValidate] = useState({
        state: false,
        text: "Error: invalid mail validation"
    });
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    
    
    // Obtenemos el valor de la variable 'valtoken'
    const valtoken = urlParams.get('valtoken');
    const valtokenPass = urlParams.get('valtokenPass');
    
    const userToken = {
        id:"1",
        data1:valtoken,
        data2:""
    }

    useEffect(()=>{
        //console.log(userToken);
        if(valtoken)
        return async()=>{
            try {
                //PASAR ESTO A REDUX
                const response = await axios.post(`http://localhost:8000/activateUser/`,
                userToken)
                console.log('val:,', response);
                setValidate({...validate, state:true, text:response.data.text})
                console.log({...validate, state:true, text:response.data.text});
                return navigate('/access?email_true')
                
            } catch (error) {    
                //la respuesta del error me viene en error.response.data.text
                console.log(error.response.data);
                console.log('no se puse validar');
            }
        }

//------Redireccion al componente de Cambio de contrasena
        if(valtokenPass) return navigate(`/access?token=${valtokenPass}`)
    },[]);
    
}

export default EmailVerification;