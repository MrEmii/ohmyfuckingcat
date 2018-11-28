import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSignInAlt, faHandHoldingHeart} from '@fortawesome/free-solid-svg-icons';

import logo from './images/logo.png';
import './css/Header.css';

class Header extends Component {
  
  componentDidMount(){
    $(document).ready(function(){
      var top = $('.menus').offset().top;
    $(window).on('scroll', function(){
        if($(window).scrollTop() >= top){
          $('.menus').addClass('menu')
        } else {
          $('.menus').removeClass('menu')
        }
      })
    })
  }
  
  componentDidUpdate(){
       
  }


  onClickPopup = () =>{
    var overlay = document.getElementById('overlay');
    var login = document.getElementById('login');
    var signup = document.getElementById('signup');
    overlay.classList.add('active');
    login.classList.add('active');
    signup.classList.remove('active');
    
  }

  onClickCPopup = () =>{
    var overlay = document.getElementById('overlay');
    var login = document.getElementById('login');
    var signup = document.getElementById('signup');
    overlay.classList.remove('active');
    login.classList.remove('active');
    signup.classList.remove('active');
    
  }
  
  goToSingUp = () => {
    var login = document.getElementById('login');
    var signup = document.getElementById('signup');

    login.classList.remove('active');
    signup.classList.add('active');
    
    console.log(login.classList)
  }

    
  goToLogin = () => {
    var login = document.getElementById('login');
    var signup = document.getElementById('signup');

    signup.classList.remove('active');
    login.classList.add('active');
    
    console.log(login.classList)
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <div className="container">
            <div className="Logo">
              <img src={logo} className="App-logo" alt="logo"/>
            </div>
            <p>Meow</p>
            <nav className="menus">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link className="aa" to="/gallery">Gallery</Link></li>
                <li><Link className="aa" to="/maintenance">Memes</Link></li>
                <li><Link className="aa" to="/maintenance">Api (Soon)</Link></li>
                <li><Link className="aa" to="/maintenance">Docs (Soon)</Link></li>
                <li><a className="btn-popup" onClick={this.onClickPopup}><FontAwesomeIcon icon={faSignInAlt} size="xs" className="fas"/></a></li>
              </ul>
            </nav>
          </div>         
        </header>
        <div id="overlay" className="overlay">
        <div className="popup" id="login">
            <a onClick={this.onClickCPopup} className="b-cp"><FontAwesomeIcon icon={faTimes} /></a>
            <h3 id="title">Login</h3>
            <h4>Dont have an account? <a onClick={this.goToSingUp}>Sign up now!</a></h4>
            <form action="http://auth.ohmyfuckingcat.com/login" method="post">
              <div className="form-group">
                <input type="email" placeholder="Email" name="email" className="form-control" />
              </div>
              <div className="form-group">
                <input type="password" placeholder="Password" name="password" className="form-control" />
              </div>
              <input type="submit" className="btn-submit" role="button" aria-pressed="true" value="Ready!" />
            </form>
          </div>
          <div className="popup" id="signup">
          <a onClick={this.onClickCPopup} className="b-cp"><FontAwesomeIcon icon={faTimes} /></a>
            <h3 id="title">Sign Up</h3>
            <h4>Already have an account? <a onClick={this.goToLogin}>Sign in now!</a></h4>
            <form action="http://auth.ohmyfuckingcat.com/signup" method="post">
              <div className="form-group">
                <input type="email" placeholder="Email" name="email" className="form-control" />
              </div>
              <div className="form-group">
                <input type="password" placeholder="Password" name="password" className="form-control" />
              </div>
              <input type="submit" className="btn-submit" role="button" aria-pressed="true" value="Ready!" />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
