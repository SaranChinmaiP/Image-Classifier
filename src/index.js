import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from './MainApp';
import Header from './header';
import Footer from './Footer.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
   <Header></Header>
    <MainApp></MainApp>
    <Footer></Footer>
  </React.StrictMode>
);