import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import logo from './images/logo.png';
import './css/Header.css';

class Header extends Component {
  
  componentDidMount(){
    $(document).ready(function(){
      var top = $('.menus').offset().top;
    $(window).on('scroll', function(){
        if($(window).scrollTop() > top){
          $('.menus').addClass('menu')
        } else {
          $('.menus').removeClass('menu')
        }
      })
    })
  }
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="Logo">
              <img src={logo} className="App-logo" alt="logo"/>
            </div>
            <p>Meow</p>
            <nav className="menus">
              <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link className="aa" to="/gallery">Galeria</Link></li>
                <li><Link className="aa" to="/memes">Memes</Link></li>
                <li><Link className="aa" to="/api">Api</Link></li>
                <li><Link className="aa" to="/docs">Docs</Link></li>
              </ul>
            </nav>
          </div>         
        </header>
      </div>
    );
  }
}

export default Header;
