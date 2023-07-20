import { useState } from "react";
import { Link } from "react-router-dom";
import countriesData from "./data/countries.json";

import style from './Signup.module.css';

const SignUp = () => {

  const [signUpInfo, setSignUpInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dniPassport: "",
    codePhone: "",
    phoneNumber: "",
    country: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleSignUpChanges = (event) => {
    event.preventDefault();
    const property = event.target.name;
    const value= event.target.value;

    if(property==='codePhone'){
      //esto es solo para el input de codigo de telefono
      if (!value.startsWith('+') && value.trim() !== '') {
        setSignUpInfo({...signUpInfo, [property]: '+' + value});
      } else {
        setSignUpInfo({...signUpInfo, [property]: value});
      }
    }
    else{
      //Este es para todos los demas inputs
      setSignUpInfo({...signUpInfo, [property]: value});
    }
    //console.log({...signUpInfo, [property]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={style.formContainer} onSubmit={handleSubmit}>
      <div className={style.inputsContainer}>
        <div className={style.inputContainer}>
          <input
            name="fullname"
            onChange={handleSignUpChanges}
            value={signUpInfo.fullname}
            type="text"
            placeholder="Full name"
          />
        </div>

        <div className={style.inputContainer}>
          <input
          name="email"
          onChange={handleSignUpChanges}
          value={signUpInfo.email}
          type="text"
          placeholder="Email address"
          />
        </div>

        <div className={style.inputContainer}>
          <input
          name="password"
          onChange={handleSignUpChanges}
          value={signUpInfo.password}
          type="password"
          placeholder="Password"
          />
        </div>

        <div className={style.inputContainer}>
          <input
          name="confirmPassword"
          onChange={handleSignUpChanges}
          value={signUpInfo.confirmPassword}
          type="password"
          placeholder="Confirm password"
          />
        </div>

        <div className={style.inputContainer}>
          <input
          name="dniPassport"
          onChange={handleSignUpChanges}
          value={signUpInfo.dniPassport}
          type="text"
          placeholder="DNI / passport"
          />
        </div>

        <div className={style.inputContainer}>
          <input
            name="codePhone"
            onChange={handleSignUpChanges}
            value={signUpInfo.codePhone}
            type="tel"
            placeholder="+00"
          />
          <input
          name="phoneNumber"
          onChange={handleSignUpChanges}
          value={signUpInfo.phoneNumber}
          type="tel"
          placeholder="Phone number"
          />
        </div>

        <div>
          <select onChange={handleSignUpChanges} name="country" >
            <option value="none">Select a country</option>
            {countriesData.map((country) => {
              return <option key={country.name} value={country.name}>{country.name}</option>
            })}
          </select>
        </div>

      <div className={style.inputContainer}> 
      <label htmlFor="date">Date of birth</label>
        <input
          id="date"
          name="dateOfBirth"
          onChange={handleSignUpChanges}
          value={signUpInfo.dateOfBirth}
          type="date"
          min="1950/01/01"
          max="2023/07/15"
          />
        </div>

        

        <div className={style.inputContainer}>
          <select onChange={handleSignUpChanges} name="gender">
            <option value="none">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="binary">Binary</option>
            <option value="notBinary">Not-Binary</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      <div className={style.termsContainer}>
        <p>By clicking Sign Up, you agree to our <Link>Terms</Link>, <Link>Privacy Policy</Link> and <Link>Cookies Policy.</Link></p>
      </div>

      <button className={style.singUpBtn}> Sign Up</button>
    </form>
  );
};

export default SignUp;
