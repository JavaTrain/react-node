import React, { Component } from 'react';
import Header from '../Header';
import Main from '../Main';


const App = () => (
    <div>
        <p>Header here</p>
        <div className="container">
            <Header />
            <Main />
        </div>
        <p>Footer here</p>
    </div>
);

export default App;