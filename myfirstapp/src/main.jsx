import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Original starter code be like...
 */
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
function ref(){
    root.render(<App />);
}

setInterval(ref, 1000);