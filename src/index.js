import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from './MainApp';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='head'>
    <header>
      <h1 className="header-1">Image Classification Project</h1>
    </header>
    </div>
    <MainApp></MainApp>
  </React.StrictMode>
);