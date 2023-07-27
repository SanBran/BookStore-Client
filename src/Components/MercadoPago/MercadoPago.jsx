//import React from 'react'
import {initMercadoPago, Wallet}from '@mercadopago/sdk-react';
import { useState } from 'react';
import axios from 'axios';
const MercadoPago = ({books}) => {
  console.log(books);
    const [pref, setPref]= useState(null);
    //Some practice
    const attemptObject = {
        "userId":"b521f273-d0e5-40aa-ab16-0ee8f8e7d9ad",
        "IdBook":"6b43e8a0-e0e3-4142-bc28-2b3c6b2c7e5d",
        "name":"jhon doe",
        "email":"example@example.com",
       
        "carrito": [
          {
            "IdBook":"6b43e8a0-e0e3-4142-bc28-2b3c6b2c7e5d",
            "nombre": "Libro 2",
            "precio": 120.00,
            "cantidad": 2,
             "typeMoney":"MXN",
             "description":"libro del altisimo"
            
          },
          {
            "IdBook":"8bdcdad4-6756-49cc-81f5-982d590ccdb9",
            "nombre": "Libro 1",
            "precio": 130.45,
            "cantidad": 1,
             "typeMoney":"MXN",
             "description":"Libro de diosito"
            
          }
          
        ]
      }
    initMercadoPago('para cuando tenga la public Key');
    const createPreference= async()=>{
        try {
            console.log(attemptObject);
            const response = await axios.post("http://localhost:8000/mercadoPago", attemptObject)
            const sureThing = response.data;
            console.log(sureThing.linkPago);
            window.location.href = sureThing.linkPago;
            if(Object.keys(sureThing).length >0 || sureThing.length >0) return {...sureThing}
        } catch (error) {
            console.log(error.message);
            throw Error(error.message);
        }
    }
    const handleBuy= async()=>{
        const results = await createPreference();
        if(results) setPref(results);
    }
  return (
    <div>MercadoPago
        <button onClick={handleBuy} style={{alignItems: 'center', marginTop: '5rem'}}> BUY </button>
        {pref&& <Wallet initialization={{preferenceId: pref}}/>}
    </div>
  )
}

export default MercadoPago