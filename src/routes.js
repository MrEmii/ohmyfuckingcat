import React from 'react';
import { Route, Switch} from 'react-router-dom';


import App from './components/App';
import Welcome from './components/Welcome/Welcome';
import Content from './components/Gallery/Content';
import Memes from './components/Memes/Memes';

const AppRoutes = () => 
  <App>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/gallery" component={Content} />
          <Route exact path="/memes" component={Memes} />
          <Route component={Content} />
        </Switch>
  </App>;

export default AppRoutes;