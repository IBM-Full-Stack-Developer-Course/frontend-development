// App.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ProductList from './Components/ProductList';
import ShoppingCart from './Components/ShoppingCart';
import SuperCoin from "./Components/SuperCoin.jsx";
import './App.css'


const App = () => {
    return (
        <div>
            <h1 className='app-heading'>E-Commerce Application</h1>
            <ProductList/>
            <ShoppingCart/>
            <SuperCoin/>
        </div>

    );
};

export default App;
