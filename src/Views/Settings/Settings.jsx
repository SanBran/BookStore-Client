//import React from "react";
import styles from "./Settings.module.css";
import { useEffect, useState } from "react";
import MyData from "./MyData/MyData";
import Security from "./Security/Security";
import DragAndDrop from "../../Components/DragAndDrop/DragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/actions";

//----icons
import profile_icon from '../../assets/icons/profile.svg';
import edit_icon from '../../assets/icons/edit_icon.svg';


function Settings() {
  const user = useSelector((state) => state.userDetail);
  const dispatch = useDispatch()
  

  const [currentView, setCurrentView] = useState("data");
  const [form, setForm] = useState({
    id: user.id,
    photoUser: user.photoUser
  }) 
  useEffect(() => {
    dispatch(updateUser(form));
  }, [form]);

  
  

  return (
    <div className={styles.container}>
      <div className={styles.containerPadding}>
        <div className={styles.containerData}>
          <h2 className={styles.title}>Settings</h2>
          <div className={styles.containerImg}>
            <img className={styles.userImg} src={user.photoUser ? user.photoUser : profile_icon}  />
            <div className={styles.DragAndDrop}>
            <DragAndDrop user={user}  setForm={setForm} />
            </div>
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
