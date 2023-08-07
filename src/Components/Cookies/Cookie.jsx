import { useSelector, useDispatch } from "react-redux/es/hooks/useSelector";
import { obtainToken } from "../../redux/actions/actions";
import Cookies from "js-cookie";

export function Cookie() {
  const token = useSelector((state) => state.theToken);
  const userDetails = useSelector(state=> state.userDetail);
  const theBanner = useSelector(state=> state.access)
  const dispatch = useDispatch();
  if (theBanner.state) {
      dispatch(obtainToken(userDetails.email));
      if(token){
    const userToken = token;

    window.localStorage.setItem("token", userToken);

    //Esto para devolver a la hora de comprobar sesión, y guardar en cookie claro
    Cookies.set("setToken", userToken);
    Cookies.set("setEmail", userDetails.email);
    return 'Cookie exitosa';
      }
  } else return 'Sorry, creo que no hubo un acceso previo';
}
