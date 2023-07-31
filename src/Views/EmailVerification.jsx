import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { activateUser } from "../redux/actions/actions"; 
import { redirectToken } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const EmailVerification = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
//--Obtenemos el valor de la variable 'valtoken'
    const valtoken = urlParams.get('valtoken').substring(1);
    const action = urlParams.get('valtoken')[0];
    useEffect(()=>{
        switch(action){
            case '1': return async()=>{
                await dispatch(activateUser(valtoken))
                navigate('/access')
                return
                
            };
            case '2': return async()=>{
                await dispatch(redirectToken(valtoken))
                return navigate(`/access?changePass=true`)
            };
        }
    },[valtoken, dispatch, navigate]);   
}
export default EmailVerification;





