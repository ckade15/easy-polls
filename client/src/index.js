import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Route import
import RoutesManager from './setup/routes-manager/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesManager />
  </React.StrictMode>
);

reportWebVitals();
