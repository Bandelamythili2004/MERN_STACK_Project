import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Master from './components/Master.jsx'
import "./styles/global.css"
import { CartProvider } from './components/CartContext.jsx'




createRoot(document.getElementById('root')).render(
  <CartProvider>
  <Master></Master>
  </CartProvider>
)
