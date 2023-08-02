//import React from "react";
import { useNavigate } from "react-router-dom";

function Security() {
  const navigate = useNavigate();


const onChange = ()=> {
 navigate("/access?requestChangePass=true")

}

  return (
    <div>
      <button onClick={onChange}>Cambiar contraseña</button>
    </div>
  );
}

export default Security;
