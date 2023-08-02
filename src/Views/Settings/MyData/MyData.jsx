import { useEffect, useState } from "react";
import styles from "./MyData.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { expresions } from "../../../utils/regex";
import countriesData from '../../../Components/Signup/data/countries.json'

const MyData = () => {
  //const user = useSelector((state) => state.userDetail);

  const user ={
    birthday:"1999-03-05",
    confirmPassword: "Sasha44.",
    country:"Argentina",
    dniPasaport:"1234567",
    email:"sas@gmail.com",
    gender:"female",
    name:"Sasha Camargo",
    password:"Sasha44.",
    phone:"1123895328",
    phoneCode:"+54"
  }

  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dniPasaport: "",
    phoneCode: "",
    phone: "",
    country: "",
    birthday: "",
  })
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Limpiar el mensaje de éxito después de 3 segundos
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

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
      case 'dniPasaport': {
        if (state.dniPasaport === "") setErrors({ ...errors, [property]: 'Enter your identity document' })
        else setErrors({ ...errors, [property]: '' })
      }
        break;
    }

    if (
      property === 'dniPasaport' || 
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

const handleChange = (event) => {
  const property = event.target.name;
  const value = event.target.value;

  if (property === 'phoneCode') {
    //----Esto es solo para el input de codigo de telefono
    if (!value.startsWith('+') && value.trim() !== '') setFormData({ ...formData, [property]: '+' + value });
    else setFormData({ ...formData, [property]: value });
  }
  else {
    //----Este es para todos los demas inputs
    setFormData({ ...formData, [property]: value });
  }
  //--Validar los inputs cuando se hacen cambios
  validateInputs({ ...formData, [property]: value }, property)
};

//------------VALIDACION DEL SUBMIT
  const validateSubmit = () => {
    for (const property in formData) {
      if (property === 'gender') continue;
      if (!formData[property].length) {
        setErrors({ ...errors, [property]: 'Incomplete' });
        return false
      }
    }
    for (const property in errors) {
      if (property === 'gender') continue;
      if (errors[property].length) return false;
    }
    return true
  };


  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const handleSave = (field) => {
  //   const isValid = expresions[field].test(formData[field]);

  //   if (isValid) {
  //     setSuccessMessage(`¡Dato ${field} guardado con éxito!`);
  //     sendData();
  //     setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  //   } else {
  //     const errorMessage = `Invalid data ${field}: ${formData[field]}`;
  //     console.log(errorMessage);
  //     setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  //   }
  // };

  const handleSave = async (event) => {
    event.preventDefault();
    if(validateSubmit()){
      try {
        await sendData;
        setSuccessMessage(`¡Changes saved successfully!`);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };


  const sendData = () => {
    console.log('datos guardados');
    //------implementar esto con redux

    // axios
    //   .put(`http://localhost:8000/updUser`, formData)
    //   .then((response) => {
    //     // mensaje de exito
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     // mensaje de error
    //     console.error("Error al enviar los datos:", error);
    //   });
  };

  return (
    <form className={styles.formContainer}>
      <div className={styles.inputsContainer}>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

        <label className={styles.inputContainer}>
          Name
          <input
            className={errors.name.length ? (`${styles.input} ${styles.error}`) : styles.input}
            name="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Full name"
            required
          />
        </label>
        {errors.name.length ? <p className={styles.textError}>{errors.name}</p> : <></>}

        <label className={styles.inputContainer}>
          Birthday
          <input
            className={errors.birthday.length ? (`${styles.input} ${styles.error}`) : (`${styles.input}`)}
            id="date"
            name="birthday"
            onChange={handleChange}
            value={formData.birthday}
            type="date"
            min="1950/01/01"
            max="2023/07/15"
          />
        </label>
        {errors.birthday.length ? <p className={styles.textError}>{errors.birthday}</p> : <></>}

        <label className={styles.inputContainer}>
          Country
          <select
            name="country"
            className={errors.country.length ? (`${styles.input} ${styles.select} ${styles.error}`) : (`${styles.input} ${styles.select}`)}
            onChange={handleChange}
          >
            <option value={formData.country}>{formData.country}</option>
            {countriesData.map((country) => {
              return <option key={country.name} value={country.name}>{country.name}</option>
            })}
          </select>
        </label>
        {errors.country.length ? <p className={styles.textError}>{errors.country}</p> : <></>}

        <label className={styles.inputContainer}>
          Phone
          <div className={styles.phoneInputs}>
            <input
              className={errors.phoneCode.length ? (`${styles.input} ${styles.codeInput} ${styles.error}`) : (`${styles.input} ${styles.codeInput}`)}
              name="phoneCode"
              onChange={handleChange}
              value={formData.phoneCode}
              type='text'
              placeholder="+00"
              required
            />
            <input
              className={errors.phone.length ? (`${styles.input} ${styles.phoneInput} ${styles.error}`) : (`${styles.input} ${styles.phoneInput}`)}
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              type="telephone"
              placeholder="Phone number"
              required
            />
          </div>
        </label>
        {errors.phoneCode.length ? <p className={styles.textError}>{errors.phoneCode}</p> : <></>}
        {errors.phone.length ? <p className={styles.textError}>{errors.phone}</p> : <></>}

        <label className={styles.inputContainer}>
          Gender
          <select
            name="gender"
            className={(`${styles.input} ${styles.select}`)}
            onChange={handleChange}
            required
          >
            <option value={formData.gender}>{formData.gender}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="binary">Binary</option>
            <option value="notBinary">Not-Binary</option>
            <option value="none">Other</option>
          </select>
        </label>

        <label className={styles.inputContainer}>
          DNI/Passport
          <input
            className={errors.dniPasaport.length ? (`${styles.input} ${styles.error}`) : styles.input}
            name="dniPasaport"
            onChange={handleChange}
            value={formData.dniPasaport}
            type="text"
            placeholder="DNI / passport"
            required
          />
        </label>
        {errors.dniPasaport.length ? <p className={styles.textError}>{errors.dniPasaport}</p> : <></>}
      </div>

      <button className={styles.saveBtn} onClick={handleSave}>Save changes</button>

    </form>
  );
};

export default MyData;

