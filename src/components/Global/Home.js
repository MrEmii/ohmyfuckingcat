import React, { Component } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery';

import './css/Home.css';

class Home extends Component{
  

  static propTypes = {
    children: PropTypes.object
  };
  
  
  render(){

    
    const { body } = this.props;
    return(
      <div className="home">
        {body}
      </div>
    );
  }

}

export default Home;