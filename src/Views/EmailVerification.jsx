import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { activateUser } from "../redux/actions/actions"; 
import { redirectToken } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound/NotFound";

const EmailVerification = ()=>{
    const valor = useSelector(state=>state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
//--Obtenemos el valor de la variable 'valtoken'
    const valtoken = urlParams.get('valtoken').substring(1);
    const action = urlParams.get('valtoken')[0];
    useEffect(()=>{
        if(action==='1'){
            console.log('validar email');
            dispatch(activateUser(valtoken));
            return navigate('/access')
        };
        if(action==='2'){
            console.log('cambiar contrasena');
            dispatch(redirectToken(valtoken));
            return navigate(`/access?changePass=true`);
    };
        // switch(action){
        //     case '1': return async()=>{
        //         console.log('validar email');
        //         await dispatch(activateUser(valtoken));
        //         return navigate('/access')
        //         //return window.location.href = "https://book-store-client-coral.vercel.app/access/";
        //     };
        //     case '2': return async()=>{
        //         console.log('cambiar contrasena');
        //         await dispatch(redirectToken(valtoken));
        //         return navigate(`/access?changePass=true`);
        //     };
        // }
    },[dispatch]);   

    return(
        <>
            <NotFound token={valor}/>
            <>{valor}</>
        </>
    )
}
export default EmailVerification;





