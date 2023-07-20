import { useState } from "react";
import { Link } from "react-router-dom";
import countriesData from "./data/countries.json";

import style from './Signup.module.css';

const SignUp = () => {
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dniPassport: "",
    codePhone: "",
    phoneNumber: "",
    country: "",
    dateOfBirth: "",
  })

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

  //-----------VALIDACIONES DEL FORMULARIO
  const expresions = {
    fullname: /^[a-zA-Z]+( [a-zA-Z]+)+$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //contrasena debe tener entre 8-15 caract., minus, mayus, numeros y caracter especial [$@$!%*?&#.] cualquier a delos que estan dentro de los corchetes
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.])[A-Za-z\d$@$!%*?&#.]{8,15}$/,
    codePhone: /^(?:\+)?[1-9]{1,3}$/,
    phoneNumber: /^[0-9]{6,15}$/,
    dateOfBirth: /^(?:19[5-9]\d|20[0-1]\d)(\/|-)(0[1-9]|1[0-2])(\/|-)([0-2][0-9]|3[0-1])$/
  }
  const validate = (state, property)=>{
    //console.log(state);
    console.log(property);
    switch(property){
      case 'confirmPassword': {
        if(state.password !== state.confirmPassword ){
          setErrors({...errors, [property]: 'Passwords do not match'})
        } else{
          setErrors({...errors, [property]: ''})         
        }
      }
      break;
      case 'country': {
        if(state.country === "none" ){
          setErrors({...errors, [property]: 'No country selected'})
        } else{
          setErrors({...errors, [property]: ''})         
        }

      }
    }

    if(property === 'dniPassport' || property === 'confirmPassword' || property === 'country' || property === 'gender') return;

    if(!expresions[property].test(state[property])){
      switch(property){
        case 'fullname': setErrors({...errors, [property]: 'Invalid name'})
        break;
        case 'email': setErrors({...errors, [property]: 'Invalid email'})
        break;
        case 'password': setErrors({...errors, [property]: 'Password must be between 8-15 characters, lowercase, uppercase, numbers and special character'})
        break;
        case 'codePhone': setErrors({...errors, [property]: 'Invalid code'})
        break;
        case 'phoneNumber': setErrors({...errors, [property]: 'Invalid phone number'})
        break;
        case 'dateOfBirth': setErrors({...errors, [property]: 'Invalid date'})
        break;
      }
    } else{
      switch(property){
        case 'fullname': setErrors({...errors, [property]: ''})          
        break;
        case 'email': setErrors({...errors, [property]: ''})          
        break;
        case 'password': setErrors({...errors, [property]: ''})          
        break;
        case 'codePhone': setErrors({...errors, [property]: ''})         
        break;
        case 'phoneNumber': setErrors({...errors, [property]: ''})          
        break;
        case 'dateOfBirth': setErrors({...errors, [property]: ''})         
        break;
      }
    }

  }
  //------------FIN DE LAS VALIDACIONES

  

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
      //console.log({...signUpInfo, [property]: value});
    }

    //Validar los inputs cuando se hacen cambios
    validate({...signUpInfo, [property]: value}, property)
  };

  const validateSubmit =()=>{
    console.log('submit:',signUpInfo);
    console.log('submit:',errors);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    validateSubmit()
  };


  return (
    <form className={style.formContainer} onSubmit={handleSubmit}>
      <div className={style.inputsContainer}>
        <input 
          className={style.input}
          name="fullname"
          onChange={handleSignUpChanges}
          value={signUpInfo.fullname}
          type="text"
          placeholder="Full name"
          required
        />
        {errors.fullname.length ? <p className={style.textError}>{errors.fullname}</p> : <></>}

        <input
        className={style.input}
        name="email"
        onChange={handleSignUpChanges}
        value={signUpInfo.email}
        type="text"
        placeholder="Email address"
        required
        />
        {errors.email.length ? <p className={style.textError}>{errors.email}</p> : <></>}

        <input
        className={style.input}
        name="password"
        onChange={handleSignUpChanges}
        value={signUpInfo.password}
        type="password"
        placeholder="Password"
        required
        />
        {errors.password.length ? <p className={style.textError}>{errors.password}</p> : <></>}

        <input
        className={style.input}
        name="confirmPassword"
        onChange={handleSignUpChanges}
        value={signUpInfo.confirmPassword}
        type="password"
        placeholder="Confirm password"
        required
        />
        {errors.confirmPassword.length ? <p className={style.textError}>{errors.confirmPassword}</p> : <></>}

        <input
        className={style.input}
        name="dniPassport"
        onChange={handleSignUpChanges}
        value={signUpInfo.dniPassport}
        type="text"
        placeholder="DNI / passport"
        required
        />
        {errors.dniPassport.length ? <p className={style.textError}>{errors.dniPassport}</p> : <></>}

        <div className={style.phoneInputs}>
          <input
          className={style.codeInput}
          name="codePhone"
          onChange={handleSignUpChanges}
          value={signUpInfo.codePhone}
          type='text'
          placeholder="+00"
          required
          />
          <input
          className={style.phoneInput}
          name="phoneNumber"
          onChange={handleSignUpChanges}
          value={signUpInfo.phoneNumber}
          type="telephone"
          placeholder="Phone number"
          required
          />
        </div>
        {errors.codePhone.length ? <p className={style.textError}>{errors.codePhone}</p> : <></>}
        {errors.phoneNumber.length ? <p className={style.textError}>{errors.phoneNumber}</p> : <></>}

        <select 
        name="country" 
        className={style.select}
        onChange={handleSignUpChanges} 
        >
          <option value="none">Select a country</option>
          {countriesData.map((country) => {
            return <option key={country.name} value={country.name}>{country.name}</option>
          })}
        </select>
        {errors.country.length ? <p className={style.textError}>{errors.country}</p> : <></>}

        <div className={style.dateContainer}> 
          <label className={style.dateLabel} htmlFor="date">Date of birth</label>
          <input 
          className={style.dateInput}
          id="date"
          name="dateOfBirth"
          onChange={handleSignUpChanges}
          value={signUpInfo.dateOfBirth}
          type="date"
          min="1950/01/01"
          max="2023/07/15"
          />
        </div>
        {errors.dateOfBirth.length ? <p className={style.textError}>{errors.dateOfBirth}</p> : <></>}

        <select 
        name="gender"
        className={style.select}
        onChange={handleSignUpChanges} 
        required
        >
          <option value="none">Select a gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="binary">Binary</option>
          <option value="notBinary">Not-Binary</option>
          <option value="none">None</option>
        </select>

      </div>

      <div className={style.singUpContainer}>
        <div className={style.termsContainer}>
          <p>By clicking Sign Up, you agree to our <Link>Terms</Link>, <Link>Privacy Policy</Link> and <Link>Cookies Policy.</Link></p>
        </div>

        <button className={style.singUpBtn} onClick={handleSubmit}> Sign Up</button>
      </div>
    </form>
  );
};

export default SignUp;
