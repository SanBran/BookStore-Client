import { useEffect, useState } from "react";
import styles from "../Settings.module.css";
import axios from "axios";

const MyData = ({ user,onBack }) => {

  const [formData, setFormData] = useState(user);

  const expressions = {
    name: /^[a-zA-Z]+( [a-zA-Z]+)+$/,
    phoneCode: /^(?:\+)?[1-9]{1,3}$/,
    phone: /^[0-9]{6,15}$/,
    birthday:
      /^(?:19[5-9]\d|20[0-1]\d)(\/|-)(0[1-9]|1[0-2])(\/|-)([0-2][0-9]|3[0-1])$/,
    dniPassport:/^[0-9]/,
  };

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Limpiar el mensaje de éxito después de 3 segundos
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (field) => {
    const isValid = expressions[field].test(formData[field]);
    
    if (isValid) {
      // Aquí puedes realizar cualquier acción que necesites con el dato guardado en formData[field]
      console.log(`Dato ${field} guardado:`, formData[field]);
      setSuccessMessage(`¡Dato ${field} guardado con éxito!`);
      sendData();
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    } else {
      const errorMessage = `Invalid data ${field}: ${formData[field]}`;
      console.log(errorMessage);
      setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
    }
  };

  // Función para manejar el cambio del user

  const sendData = () => {
    axios
      .put(`http://localhost:8000/updUser`, formData)
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
    <div>
      <h2>My Data</h2>
      <div>
        <button onClick={onBack}>Back</button>
        <br />
        <div className={styles.inputsContainer}>
          <label>
            Name:
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <button onClick={() => handleSave("name")}>Guardar</button>
            {errors.name && <p>{errors.name}</p>}
            {successMessage && <p>{successMessage}</p>}
          </label>
        </div>
        <br />
        <div>
          <label>
            Birthday:
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              min="1950/01/01"
              max="2023/07/15"
            />
            <button onClick={() => handleSave("birthday")}>Guardar</button>
            {errors.birthday && <p>{errors.birthday}</p>}
          </label>
        </div>
        <br />
        <div>
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <button onClick={() => handleSave("country")}>Guardar</button>
            {errors.country && <p>{errors.country}</p>}
          </label>
        </div>
        <br />
        <div>
          <label>
            Phone:
            <input
              type="text"
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
            />
            {errors.phoneCode && <p>{errors.phoneCode}</p>}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <button onClick={() => handleSave("phone")}>Guardar</button>
            {errors.phone && <p>{errors.phone}</p>}
          </label>
        </div>
        <br />
        <div>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            <button onClick={() => handleSave("gender")}>Guardar</button>
            {errors.gender && <p>{errors.gender}</p>}
          </label>
        </div>
        <br />
        <div>
          <label>
            DNI/Passport:
            <input
              type="text"
              name="dniPassport"
              value={formData.dniPassport}
              onChange={handleChange}
            />
            <button onClick={() => handleSave("dniPassport")}>Guardar</button>
            {errors.dniPassport && <p>{errors.dniPassport}</p>}
          </label>
        </div>
      </div>
    </div>
  );
};

export default MyData;

/* const expresions = {
    name: /^[a-zA-Z]+( [a-zA-Z]+)+$/,
    phoneCode: /^(?:\+)?[1-9]{1,3}$/,
    phone: /^[0-9]{6,15}$/,
    birthday: /^(?:19[5-9]\d|20[0-1]\d)(\/|-)(0[1-9]|1[0-2])(\/|-)([0-2][0-9]|3[0-1])$/
  } */
