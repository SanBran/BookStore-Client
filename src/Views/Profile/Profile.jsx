//import React from 'react'

//import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
    listWish: [],
    token: "89d9e77c6d4231",
    updatedAt: "2023-07-19T21:29:40.342Z",
    createdAt: "2023-07-19T21:29:40.342Z",
    dateChange: null,
    deletedAt: null,
  };
  return (
    <div className="overlay" >
      <div className="overlay-content">
        <div>
          <img src={user.photoUser} width="70" height="70" />
          <h3 style={{ color: "BLACK" }}>{user.name}</h3>
          <h5 style={{ color: "BLACK" }}>{user.email}</h5>
        </div>
        <nav>
          <div>
            <Link to="/wishlist">Wishlist</Link>
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
