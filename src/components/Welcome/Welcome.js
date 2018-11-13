import React, { Component } from 'react'

import cat from '../Global/images/maintence.png'
import './assets/Welcome.css';

class Welcome extends Component{

  componentDidMount(){}

  render(){
    return(
      <React.Fragment>
        <div className="w">
          <div className="inM">
            <img src={cat} alt=""/>
          </div>
          <h1>Estamos trabajando en esto!</h1>
        </div>
      </React.Fragment>
    );
  }

}

export default Welcome;