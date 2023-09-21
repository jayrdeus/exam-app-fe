import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/useAuth";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
document.getElementById('root')
);
