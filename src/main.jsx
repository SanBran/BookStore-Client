import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Modal from 'react-modal'

// Establece el elemento raíz de tu aplicación para que los lectores de pantalla no vean el contenido principal cuando el modal esté abierto
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
