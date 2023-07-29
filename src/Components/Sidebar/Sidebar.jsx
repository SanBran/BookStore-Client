import React, {useRef} from 'react'
import { useState } from 'react'
import styles from  './Sidebar.module.css'
import logo from '../../sources/logo.png'
import newArraival from '../../sources/New.png'
import newArraival2 from '../../sources/New2.png'
import free from '../../sources/free.png'
import free2 from '../../sources/free2.png'
import popular from '../../sources/popular.png'
import popular2 from '../../sources/popular2.png'

function Sidebar({scrollToNewArraivals, scrollToPopular, scrollToFree,select}) {
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Opciones: 'auto', 'smooth'
      });
    };
  return (
    
    <div className={styles.container}>
        <button onClick={scrollToTop} className={styles.btnlogo}>
        <img className={styles.logo} src={logo} alt="" />
        </button>
      <div className={styles.buttons}>
        <button onClick={() => scrollToNewArraivals()} className={styles.btnlogo}>
        {select === "New" ? <img className={styles.new} src={newArraival} alt="" /> : <img className={styles.new} src={newArraival2} alt="" /> }
        </button>
        <button onClick={() => scrollToPopular()} className={styles.btnlogo}>
        {select === "Popular" ? <img className={styles.new} src={popular} alt="" /> : <img className={styles.new} src={popular2} alt="" /> }
        </button>
        <button onClick={() => scrollToFree()} className={styles.btnlogo}>
        {select === "Free" ? <img className={styles.new} src={free} alt="" /> : <img className={styles.new} src={free2} alt="" /> }
        </button>
      </div>
        <button className={styles.openButton} >〉</button>
    </div>
  )
}

export default Sidebar