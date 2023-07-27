import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { activateUser } from "../redux/actions/actions"; 
import { redirectToken } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const EmailVerification = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    
    // Obtenemos el valor de la variable 'valtoken'
    const valtoken = urlParams.get('valtoken');
    const valtokenPass = urlParams.get('valtokenPass');
    
    useEffect(()=>{
        const validateEmail = async()=>{
            await dispatch(activateUser(valtoken))
            return navigate('/access')
        };
        if(valtoken) validateEmail();

        const validatePassword = async()=>{
            await dispatch(redirectToken(valtokenPass))
            return navigate(`/access?changePass=${valtokenPass}`)
        };
        if(valtokenPass) validatePassword();

    },[valtoken, dispatch, navigate]);   
    return (
            <div>✅</div>)
}

export default EmailVerification;





