import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group';

import './css/Home.css';

class Home extends Component{

  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render(){
    const { body } = this.props;
    return(
      <div className="home">
        <CSSTransition
         in={body} timeout={300} classNames="star">
          {body}
        </CSSTransition>
      </div>
    );
  }

}

export default Home;