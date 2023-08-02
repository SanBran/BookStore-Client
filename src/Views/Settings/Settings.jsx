//import React from "react";
import styles from "./Settings.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import MyData from "./MyData/MyData";
import Security from "./Security/Security";

//----icons
import profile_icon from '../../assets/icons/profile.svg';
import edit_icon from '../../assets/icons/edit_icon.svg';


function Settings() {
  const user = useSelector((state) => state.userDetail);

  const [currentView, setCurrentView] = useState("data"); 

  return (
    <div className={styles.container}>
      <div className={styles.containerPadding}>
        <div className={styles.containerData}>
          <h2 className={styles.title}>Settings</h2>
          <div className={styles.containerImg}>
            <img className={styles.userImg} src={user.photoUser ? user.photoUser : profile_icon} width="70" height="70" />
            <img className={styles.editImg} src={edit_icon} alt="edit" />
          </div>
          <h2 className={styles.name}>{user.name}</h2>
        </div>

        <div className={styles.formsContainer}>
          <div className={styles.switchForms}>
            <div 
            className={currentView === "data" ? styles.switchFocus : styles.switch}
            onClick={() => setCurrentView("data")}
            >
                <h1 className={styles.switchTitle}>My Data</h1>
            </div>
            <div 
            className={currentView === "security" ? styles.switchFocus : styles.switch}
            onClick={() => setCurrentView("security")}
            >
                <h1 className={styles.switchTitle}>Security</h1>
            </div>
          </div>

          <div className={styles.form}>
            {currentView === "data" && <MyData/>}
            {currentView === "security" && <Security/>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;
