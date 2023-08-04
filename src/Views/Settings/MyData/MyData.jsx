import { useEffect, useState } from "react";
import styles from "./MyData.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expresions } from "../../../utils/regex";
import countriesData from '../../../Components/Signup/data/countries.json';
import { updateUser } from "../../../redux/actions/actions";

const MyData = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetail);

  const [formData, setFormData] = useState({
    id: '',
    name:'',
    dniPasaport:'',
    phoneCode:'',
    phone:'',
    country:'',
    birthday:'',
    gender:'',
  });
  useEffect(()=>{
    setFormData({
      id: user.id ? user.id : '',
      name: user.name ? user.name : '',
      dniPasaport: user.dniPasaport ? user.dniPasaport : '',
      phoneCode: user.phoneCode ? user.phoneCode : '',
      phone: user.phone ? user.phone : '',
      country: user.country ? user.country :'',
      birthday: user.birthday ? user.birthday : '',
      gender: user.gender ? user.gender : '',
    });
  },[user]);
  const [errors, setErrors] = useState({
    name: "",
    dniPasaport: "",
    phoneCode: "",
    phone: "",
    country: "",
    birthday: "",
    gender: "",
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

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await dispatch(updateUser(formData));
      setSuccessMessage(`¡Changes saved successfully!`);
    } catch (error) {
      console.error("Error sending data:", error);
    }
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

