// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/cartContext.jsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position='top-right' reverseOrder={false}/>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
