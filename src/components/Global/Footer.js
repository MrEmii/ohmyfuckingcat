import React, { Component } from 'react';
import './css/Footer.css';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
  
  render() {
    return (
      <div className="footer">
        <ul>
          <li><a href="https://twitter.com/MrEmiii">@MrEmii</a></li>
          <li><p>Oh My Fucking Cat!&copy;</p></li>
          <li><a href="https://twitter.com/KiritoDv">@KiritoDev</a></li>
        </ul>

      </div>
    );
  }
}