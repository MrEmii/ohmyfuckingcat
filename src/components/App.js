import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Assets
import './Global/css/App.css';

//Components
import Header from './Global/Header';
import Footer from './Global/Footer';
import Home from './Global/Home';


class App extends Component {
  
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {    

    const { children } = this.props;

    return (
      <div className="App">         
          <Header />
          <div className="contencito">
            <Home body={children}/>
          </div>
          <Footer />
      </div>
    );
  }
}

export default App;
