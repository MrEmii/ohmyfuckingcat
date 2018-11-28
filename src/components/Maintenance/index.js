import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './assets/index.css';

class Maintenance extends Component {
    render(){
        return(
            <React.Fragment>
            <div className="mm">
              
                <h2>In Developement go to <Link to="/gallery">Gallery</Link></h2>
                <h3>Meow</h3>
            </div>
          </React.Fragment>
        )
    }
}
export default Maintenance;