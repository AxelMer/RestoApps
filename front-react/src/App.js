import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Modulos/Dashboard/home';

import Cuenta from './Modulos/Dashboard/Cuenta';
import Salon from './Modulos/Dashboard/Salon';
import Menu from './Modulos/Dashboard/Menu';
import Login from './Modulos/Login/login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route path="/adm-cuenta" component={Cuenta} />
            <Route path="/adm-salon" component={Salon} />
            <Route path="/adm-menu" component={Menu} />
          </Switch>
        </Router>

      </header>
    </div>
  );
}

export default App;