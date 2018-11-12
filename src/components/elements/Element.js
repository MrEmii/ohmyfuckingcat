import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Element.css';

export default class Element extends Component {

  static propTypes = {
    source: PropTypes.string.isRequired,
    name: PropTypes.string,
    tag: PropTypes.array
  };  
  render() {
    
    
    const {source, name, tag} = this.props;
    
    return (
      <div className="Content">
        <a>{name}</a>
        <img src={source} alt="" width="100%"/>
        <h2>{tag}</h2>
      </div>
    );
  }
}