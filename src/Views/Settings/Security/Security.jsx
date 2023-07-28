//import React from "react";
import { useNavigate } from "react-router-dom";

function Security({ onBack }) {
  const navigate = useNavigate();


const onChange = ()=> {
 navigate("/access?requestChangePass=true")

}

  return (
    <div>
    
      <h2>Security</h2>
      <button onClick={onBack}>Back</button>
      <br />
      <button onClick={onChange}>Cambiar contraseña</button>
    </div>
  );
}

export default Security;
