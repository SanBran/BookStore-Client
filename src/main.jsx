import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Modal from 'react-modal';

import "@tremor/react"

import { GoogleOAuthProvider } from '@react-oauth/google';
//---------clientID para usar en el localhost:3000
// const clientID = "637027522589-6jbd17n7qelc1mqtp4c1gl43lvjp57cf.apps.googleusercontent.com";
//---------clientID para usar en el https://book-store-client-coral.vercel.app/
const clientID = "637027522589-j7nin8g8gico6g5hsfkkg98u2r4gfbj6.apps.googleusercontent.com";



// Establece el elemento raíz de tu aplicación para que los lectores de pantalla no vean el contenido principal cuando el modal esté abierto
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={clientID}>
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
