import React, { Component } from 'react';
import logo from './images/logo.png';
import './css/Header.css';

class Header extends Component {
  
  render() {
    return (
      <div className="Header">
        <div className="Logo">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Meow</h2>
        </div>
      </div>
    );
  }
}

export default Header;
