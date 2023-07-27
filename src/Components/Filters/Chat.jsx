import React, { useState } from "react";
import "./Filters.module.css"
import axios from "axios";


const chat = ({ handleChatClose }) => {
    const [inputMessage, setInputMessage] = useState("");
    const [message, setMessage] = React.useState([]);

    const options = [
        'hola',
        'libros',
        'disponibilidad',
        'precios',
        'comprar',
        'cancelar',
        'ayuda',
        'adios'
    ]

    const handleOptionClick = async (option) => {

        const Message = {
            "message": option,
            "sender": "whatsapp:+5218129440532"


        }


        try {

            const response = await axios.post('http://localhost:8000/SMS-Whatsapp', Message)
            console.log(response.data.Whatsapp.Message)

            setMessage([...message ,response.data.Whatsapp.Message])

            

        } catch (error) {
            console.log(error.message)
        }
        
        
      
    };

    const handleMessage = async (event) => {
        event.preventDefault();
        const message = event.target.value;

        setInputMessage(message)
      


    }

    const handleSendMessage = async (event) => {
        const Message = {
            "message": inputMessage,
            "sender": "whatsapp:+5218129440532"
        }
        const response = await axios.post('http://localhost:8000/SMS-Whatsapp', Message)
        console.log(response.data.Whatsapp.Message)

        setMessage([...message, response.data.Whatsapp.Message])

    }

    

    return (
        <div class='mini-chat' >
            <button onClick={() => handleChatClose() }>Close</button>
            <h1>Hola Bienvenido al chat</h1>
            {
                options?.map((option, index) => {
                    return <button key={index} onClick={() => handleOptionClick(option)}
                    >{option}</button>

                })
             }
           
            <div>
                {
                    message?.map((message,index) => {
                        return <p key={index}>{message}</p>

                    })

                    }
            </div>
            <input onChange={handleMessage} type="text" placeholder="Escribe tu mensaje" />
            <button onClick={handleSendMessage} type='btn'>Enviar</button>

        </div>
    );
};

export default chat;
