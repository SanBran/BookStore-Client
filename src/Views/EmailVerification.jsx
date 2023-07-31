import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { activateUser } from "../redux/actions/actions";
import { redirectToken } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  //--Obtenemos el valor de la variable 'valtoken'
  const valtoken = urlParams.get('valtoken'); // No necesitas substring(1) para obtener el valor completo del token.
  const action = urlParams.get('valtoken')[0];

  useEffect(() => {
    const handleVerification = async () => {
      switch (action) {
        case '1':
          await dispatch(activateUser(valtoken));
          window.location.href = "https://book-store-client-coral.vercel.app/access/";
          break;
        case '2':
          await dispatch(redirectToken(valtoken));
          navigate(`/access?changePass=true`);
          break;
        default:
          // Handle default case if needed.
      }
    };

    handleVerification(); // Llamamos a la función aquí para que se ejecute una vez al montar el componente.
  }, [action, dispatch, navigate, valtoken]);

  return null;
};

export default EmailVerification;






