//import React from "react";
import styles from "./Settings.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import MyData from "./MyData/MyData";
import Security from "./Security/Security";


function Settings() {
  const user = useSelector((state) => state.userDetail);

  const [currentView, setCurrentView] = useState(""); // Estado para controlar qué componente mostrar
  const handleBack = () => {
    setCurrentView(); // Ocultamos el menú para volver al componente anterior
  };
  //userData={name, birthday, country, phone, phoneCode, gender,  dniPasaport, status, rol, photoUser,email, password, listWish}

  return (
    <div className={styles.container}>
      <div className={styles.containerData}>
        <img src={user.photoUser} width="70" height="70" />
        <h2 style={{ color: "BLACK" }}>{user.name}</h2>
      </div>
      <div>
        {currentView === "data" && <MyData user={user}onBack={handleBack} />}
        {currentView === "security" && <Security onBack={handleBack} />}
        {currentView !== "data" && currentView !== "security" && (
          <button onClick={() => setCurrentView("data")}>My Data</button>
        )}
        {currentView !== "data" && currentView !== "security" && (
          <button onClick={() => setCurrentView("security")}>Security</button>
        )}
      </div>
    </div>
  );
}

export default Settings;
