//import React from "react";
import styles from "./Settings.module.css";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function Settings() {
  const [visibleData, setVisibleData] = useState(false);
  const [visibleSegurity, setVisibleSegurity] = useState(false);
  const user = useSelector((state) => state.userDetail);

  // Función para manejar el clic en el botón
  const toggleData = () => {
    setVisibleData(!visibleData);
  };
  // Función para manejar el clic en el botón
  const toggleSegurity = () => {
    setVisibleSegurity(!visibleSegurity);
  };
  //userData={name, birthday, country, phone, phoneCode, gender,  dniPasaport, status, rol, photoUser,email, password, listWish}

  // Estado para mantener los datos editados
  const [userData, setUserData] = useState(user);

  // Función para manejar el cambio del user
  const handleDataChange = (name, value) => {
    setUserData((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };
  const sendData = () => {
    axios
      .put(`http://localhost:8000/updUser`, userData)
      .then((response) => {
        // mensaje de exito
        console.log(response.data);
      })
      .catch((error) => {
        // mensaje de error
        console.error("Error al enviar los datos:", error);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerData}>
        <img src={user.photoUser} width="70" height="70" />
        <h2 style={{ color: "BLACK" }}>{userData.name}</h2>
      </div>
      <div>
        <button onClick={toggleData}>My Data</button>
        {visibleData && (
          <div>
            <div className={styles.containerData}>
              <p>Name:</p>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => handleDataChange("name", e.target.value)}
              />
            </div>
            <div className={styles.containerData}>
              <p>Birthday:</p>
              <input
                type="date"
                value={userData.birthday}
                onChange={(e) => handleDataChange("birthday", e.target.value)}
              />
            </div>
            <div className={styles.containerData}>
              <p>Country:</p>
              <input
                type="text"
                value={userData.country}
                onChange={(e) => handleDataChange("country", e.target.value)}
              />
            </div>
            <div className={styles.containerData}>
              <p>Phone:</p>
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => handleDataChange("phone", e.target.value)}
              />
            </div>
            <div className={styles.containerData}>
              <p>Phone Code:</p>
              <input
                type="text"
                value={userData.phoneCode}
                onChange={(e) => handleDataChange("phoneCode", e.target.value)}
              />
            </div>
            <div className={styles.containerData}>
              <p>Gender:</p>
              <input
                type="text"
                value={userData.gender}
                onChange={(e) => handleDataChange("gender", e.target.value)}
              />
            </div>
            <div className={styles.containerData}>
              <p>DNI/Passport:</p>
              <input
                type="text"
                value={userData.dniPasaport}
                onChange={(e) =>
                  handleDataChange("dniPasaport", e.target.value)
                }
              />
            </div>
            <div className={styles.containerData}>
              <p>Photo User:</p>
              <input
                type="text"
                value={userData.photoUser}
                onChange={(e) => handleDataChange("photoUser", e.target.value)}
              />
            </div>
            <button onClick={sendData}>Guardar Cambios</button>
          </div>
        )}
      </div>
      <div>
        <button onClick={toggleSegurity}>Security</button>
        {visibleSegurity && (
          <div>
            <div className={styles.containerData}>
              <p>Email:</p>
              <input
                type="text"
                value={userData.email}
                onChange={(e) => handleDataChange("email", e.target.value)}
              />
            </div>
            <div className={styles.containerData}>
              <p>Password:</p>
              <input
                type="password"
                value={userData.password}
                onChange={(e) => handleDataChange("password", e.target.value)}
              />
            </div>
            <button onClick={sendData}>Guardar Cambios</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
