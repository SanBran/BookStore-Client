import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import countriesData from "./data/countries.json";
import { postUser } from "../../redux/actions/actions";
import { expresions } from "../../utils/regex";

import style from './Signup.module.css';

const SignUp = ({ setForm, setSignUpSuccess }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // dniPasaport: "",
    phoneCode: "",
    phone: "",
    country: "",
    birthday: "",
  })

  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // dniPasaport: "",
    phoneCode: "",
    phone: "",
    country: "",
    birthday: "",
    gender: "",
  });
  
//-----------VALIDACIONES DEL FORMULARIO
  const validateInputs = (state, property) => {
    switch (property) {
      case 'confirmPassword': {
        if (state.password !== state.confirmPassword) setErrors({ ...errors, [property]: 'Passwords do not match' })
        else setErrors({ ...errors, [property]: '' })
      }
        break;
      case 'country': {
        if (state.country === "none") setErrors({ ...errors, [property]: 'No country selected' })
        else setErrors({ ...errors, [property]: '' })
      }
        break;
      // case 'dniPasaport': {
      //   if (state.dniPasaport === "") setErrors({ ...errors, [property]: 'Enter your identity document' })
      //   else setErrors({ ...errors, [property]: '' })
      // }
      //   break;
    }

    if (
      // property === 'dniPasaport' || 
      property === 'confirmPassword' || property === 'country' || property === 'gender') return;

    if (!expresions[property].test(state[property])) {
      switch (property) {
        case 'name': setErrors({ ...errors, [property]: 'Invalid name' })
          break;
        case 'email': setErrors({ ...errors, [property]: 'Invalid email' })
          break;
        case 'password': setErrors({ ...errors, [property]: 'Password must be between 8-15 characters, lowercase, uppercase, numbers and special character' })
          break;
        case 'phoneCode': setErrors({ ...errors, [property]: 'Invalid code' })
          break;
        case 'phone': setErrors({ ...errors, [property]: 'Invalid phone number' })
          break;
        case 'birthday': setErrors({ ...errors, [property]: 'Invalid date' })
          break;
      }
    } else {
      switch (property) {
        case 'name': setErrors({ ...errors, [property]: '' })
          break;
        case 'email': setErrors({ ...errors, [property]: '' })
          break;
        case 'password': setErrors({ ...errors, [property]: '' })
          break;
        case 'phoneCode': setErrors({ ...errors, [property]: '' })
          break;
        case 'phone': setErrors({ ...errors, [property]: '' })
          break;
        case 'birthday': setErrors({ ...errors, [property]: '' })
          break;
      }
    }

  }
//-----------FIN DE LAS VALIDACIONES de inputs

  const handleSignUpChanges = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === 'phoneCode') {
      //----Esto es solo para el input de codigo de telefono
      if (!value.startsWith('+') && value.trim() !== '') setSignUpInfo({ ...signUpInfo, [property]: '+' + value });
      else setSignUpInfo({ ...signUpInfo, [property]: value });
    }
    else {
      //----Este es para todos los demas inputs
      setSignUpInfo({ ...signUpInfo, [property]: value });
    }
    //--Validar los inputs cuando se hacen cambios
    validateInputs({ ...signUpInfo, [property]: value }, property)
  };

  //------------VALIDACION DEL SUBMIT
  const validateSubmit = () => {
    for (const property in signUpInfo) {
      if (property === 'gender') continue;
      if (!signUpInfo[property].length) {
        setErrors({ ...errors, [property]: 'Incomplete' });
        return false
      }
    }
    for (const property in errors) {
      if (property === 'gender') continue;
      if (errors[property].length) return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateSubmit()){
      try {
        await dispatch(postUser(signUpInfo));
        setSignUpInfo({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          // dniPasaport: "",
          phoneCode: "",
          phone: "",
          country: "",
          birthday: "",
          gender: "",
        });
        setForm('login');
        setSignUpSuccess(true);
      } catch (error) {
        if(error.message === 'User ready exists') setErrors({ ...errors, email: 'User ready exists' })
      }
    }
  };

  return (
    <form className={style.formContainer} onSubmit={handleSubmit}>
      <div className={style.inputsContainer}>
        <input
          className={errors.name.length ? (`${style.input} ${style.error}`) : style.input}
          name="name"
          onChange={handleSignUpChanges}
          value={signUpInfo.name}
          type="text"
          placeholder="Full name"
          required
        />
        {errors.name.length ? <p className={style.textError}>{errors.name}</p> : <></>}

        <input
          className={errors.email.length ? (`${style.input} ${style.error}`) : style.input}
          name="email"
          onChange={handleSignUpChanges}
          value={signUpInfo.email}
          type="text"
          placeholder="Email address"
          required
        />
        {errors.email.length ? <p className={style.textError}>{errors.email}</p> : <></>}

        <input
          className={errors.password.length ? (`${style.input} ${style.error}`) : style.input}
          name="password"
          onChange={handleSignUpChanges}
          value={signUpInfo.password}
          type="password"
          placeholder="Password"
          required
        />
        {errors.password.length ? <p className={style.textError}>{errors.password}</p> : <></>}

        <input
          className={errors.confirmPassword.length ? (`${style.input} ${style.error}`) : style.input}
          name="confirmPassword"
          onChange={handleSignUpChanges}
          value={signUpInfo.confirmPassword}
          type="password"
          placeholder="Confirm password"
          required
        />
        {errors.confirmPassword.length ? <p className={style.textError}>{errors.confirmPassword}</p> : <></>}

        {/* <input
          className={errors.dniPasaport.length ? (`${style.input} ${style.error}`) : style.input}
          name="dniPasaport"
          onChange={handleSignUpChanges}
          value={signUpInfo.dniPasaport}
          type="text"
          placeholder="DNI / passport"
          required
        />
        {errors.dniPasaport.length ? <p className={style.textError}>{errors.dniPasaport}</p> : <></>} */}

        <div className={style.phoneInputs}>
          <input
            className={errors.phoneCode.length ? (`${style.input} ${style.codeInput} ${style.error}`) : (`${style.input} ${style.codeInput}`)}
            name="phoneCode"
            onChange={handleSignUpChanges}
            value={signUpInfo.phoneCode}
            type='text'
            placeholder="+00"
            required
          />
          <input
            className={errors.phone.length ? (`${style.input} ${style.phoneInput} ${style.error}`) : (`${style.input} ${style.phoneInput}`)}
            name="phone"
            onChange={handleSignUpChanges}
            value={signUpInfo.phone}
            type="telephone"
            placeholder="Phone number"
            required
          />
        </div>
        {errors.phoneCode.length ? <p className={style.textError}>{errors.codePhone}</p> : <></>}
        {errors.phone.length ? <p className={style.textError}>{errors.phoneNumber}</p> : <></>}

        <select
          name="country"
          className={errors.country.length ? (`${style.input} ${style.select} ${style.error}`) : (`${style.input} ${style.select}`)}
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
            className={errors.birthday.length ? (`${style.input} ${style.dateInput} ${style.error}`) : (`${style.input} ${style.dateInput}`)}
            id="date"
            name="birthday"
            onChange={handleSignUpChanges}
            value={signUpInfo.birthday}
            type="date"
            min="1950/01/01"
            max="2023/07/15"
          />
        </div>
        {errors.birthday.length ? <p className={style.textError}>{errors.dateOfBirth}</p> : <></>}

        <select
          name="gender"
          className={(`${style.input} ${style.select}`)}
          onChange={handleSignUpChanges}
          required
        >
          <option value="none">Select a gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="binary">Binary</option>
          <option value="notBinary">Not-Binary</option>
          <option value="none">Other</option>
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
