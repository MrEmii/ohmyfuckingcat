import React, { Component } from 'react'

import './assets/Welcome.css';

class Welcome extends Component{

  componentDidMount(){
    
/*    fetch("https://auth.ohmyfuckingcat.com/auth/username", {
      method: 'POST',
      mode: 'no-cors'
    }).then(json => {
      console.log(json.ok);
    })
    */
  }

  render(){
    return(
      <React.Fragment>
        <div className="w">
             <h1>Todas tus imagnes de gatitos tiernos en la palma de tú mano!</h1>         
        </div>
      </React.Fragment>
    );
  }

}

export default Welcome;