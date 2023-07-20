//import React from 'react'

//import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listWish } from "../../redux/actions/actions";
import styles from "./Profile.module.css";


//userData={name, birthday, country, phone, phoneCode, gender, email, password, dniPasaport, status, rol, photoUser, listWish}
const Profile = () => {
  let user = {
    id: "bb5057e6-c8e9-47ea-bcd4-993de06a600a",
    thirdPartyCreated: false,
    name: "Carlos Algo",
    birthday: "12/05/2005",
    country: "United States",
    phone: "1234567890",
    phoneCode: "+1",
    gender: "male",
    email: "carlos@example.com",
    password: "$2b$11$7kMYAf2mKOn7virCNwezYeuOTdw5j2Vg9nuc3nPcNYwvcI7B6P2LG",
    dniPasaport: "ABC123XYZ",
    status: true,
    rol: "new",
    photoUser: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
    listWish: [{
      "id": "6608837f-2e33-4089-aafe-d72fb77b9923",
      "title": "Abeloff. Oncología clínica",
      "author": "John E. Niederhuber, James O. Armitage, James H Doroshow, Michael B. Kastan, Joel E. Tepper",
      "country": "AR",
      "language": "es",
      "image": "http://books.google.com/books/content?id=C9U6EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "gender": "Medical",
      "sinopsis": "Presenta de manera muy completa y equilibrada entre ciencias básicas y perspectiva clínica los conocimientos más actuales en la especialidad. Pone especial énfasis en la biología del cáncer, anatomía patológica, diagnóstico, tratamiento, pronóstico, rehabilitación y prevención. Cada capítulo se abre con los puntos clave Tiene un fuerte contenido visual que lo distingue de los demás productos que están en el mercado. Explica al lector cómo seleccionar las pruebas diagnósticas más adecuadas. Muestra cómo se están aplicando en la práctica diaria las últimas investigaciones. Su práctico formato permite acceder al contenido más completo en cualquier momento y en cualquier lugar a través de ExpertConsult.",
      "price": 41456.12,
      "publishedDate": "2020-04-15",
      "pdfLink": "http://books.google.com.ar/books?id=C9U6EAAAQBAJ&printsec=frontcover&dq=%22%22&hl=&cd=37&source=gbs_api",
      "status": true,
      "editorial": "Elsevier Health Sciences",
      "numPages": 0,
      "createdAt": "2023-07-20T15:49:40.593Z",
      "updatedAt": "2023-07-20T15:49:40.593Z",
      "deletedAt": null,
      "userId": null,
      "payId": null,
      "comments": []
    },
    {
      "id": "ec5b7ef1-878f-4643-9375-b5e44cde8337",
      "title": "Alcohólicos anónimos",
      "author": "Author not Available",
      "country": "AR",
      "language": "en",
      "image": "Image not Available",
      "gender": "Alcoholism",
      "sinopsis": "Sinopsis not available.",
      "price": 0,
      "publishedDate": "1955",
      "pdfLink": "http://books.google.com.ar/books?id=LmoyzwEACAAJ&dq=%22%22&hl=&cd=17&source=gbs_api",
      "status": true,
      "editorial": "Publisher not available",
      "numPages": 0,
      "createdAt": "2023-07-20T15:49:40.561Z",
      "updatedAt": "2023-07-20T15:49:40.561Z",
      "deletedAt": null,
      "userId": null,
      "payId": null,
      "comments": []
    },
    {
      "id": "030e3da0-2be0-40f9-899b-327644ae0fa0",
      "title": "Aragon reyno de Christo, y dote de Maria Santissima",
      "author": "Roque Alberto Faci",
      "country": "AR",
      "language": "es",
      "image": "http://books.google.com/books/content?id=8ERFrYv9VAIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "gender": "Gender not Available",
      "sinopsis": "Sinopsis not available.",
      "price": 0,
      "publishedDate": "1750",
      "pdfLink": "http://books.google.com.ar/books?id=8ERFrYv9VAIC&printsec=frontcover&dq=%22%22&hl=&cd=3&source=gbs_api",
      "status": true,
      "editorial": "Publisher not available",
      "numPages": 0,
      "createdAt": "2023-07-20T15:49:40.529Z",
      "updatedAt": "2023-07-20T15:49:40.529Z",
      "deletedAt": null,
      "userId": null,
      "payId": null,
      "comments": []
    },],
    token: "89d9e77c6d4231",
    updatedAt: "2023-07-19T21:29:40.342Z",
    createdAt: "2023-07-19T21:29:40.342Z",
    dateChange: null,
    deletedAt: null,
  };
  const dispatch = useDispatch();
  const showlistWish= useSelector(state=> state.showListwish);

  const handleOverlayToggle = () => {
    dispatch(listWish(showlistWish));
    
  };
  return (
    
    <div className={styles.overlay} >
      <div className={styles.overlayContent}>
        <div>
          <img src={user.photoUser} width="70" height="70" />
          <h3 style={{ color: "BLACK" }}>{user.name}</h3>
          <h5 style={{ color: "BLACK" }}>{user.email}</h5>
        </div>
        <nav>
          <div>
            <button onClick={handleOverlayToggle} type="button">Whislist</button>
            
          </div>
          <div>
            <Link to="/history">Pucharse History</Link>
          </div>
          <div>
            <Link to="/settings">Settings</Link>
          </div>
        </nav>
      </div>
    </div>
   
  );
};

export default Profile;
