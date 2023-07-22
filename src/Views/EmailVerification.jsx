import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { activateUser } from "../redux/actions/actions"; 

import { useNavigate } from "react-router-dom";

import axios from "axios";

const EmailVerification = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    
    
    // Obtenemos el valor de la variable 'valtoken'
    const valtoken = urlParams.get('valtoken');
    //console.log('Valor de valtoken:', valtoken);
    
    const userToken = {
        id:"1",
        data1:valtoken,
        data2:""
    }

    useEffect(()=>{
        //console.log(userToken);
        const validate =async()=>{
            try {
                const response = await axios.post(`http://localhost:8000/activateUser/`,
                userToken)
                console.log('val:,', response);
                //dispatch(activateUser(token))
                navigate('/?true')
                
            } catch (error) {
                //console.log('email ya esta activado previamente');
    
                //la respuesta del error me viene en error.response.data.text
                console.log(error.response.data);
                console.log('no se puse validar');
            }
        }
        validate()
    },[])
}

export default EmailVerification;