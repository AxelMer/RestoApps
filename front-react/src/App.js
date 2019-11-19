import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Modulos/Dashboard/home';

import Cuenta from './Modulos/Dashboard/Clase_Cuenta';
import Mesa from './Modulos/Dashboard/Clase_Salon';
import Menu from './Modulos/Dashboard/Clase_Menu';
import Login from './Modulos/Login/index';
import Salon from './Modulos/Salon/index';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/salon" component={Salon} />
            <Route exact path="/home" component={Home} />
            <Route path="/adm-cuenta" component={Cuenta} />
            <Route path="/adm-salon" component={Mesa} />
            <Route path="/adm-menu" component={Menu} />
          </Switch>
        </Router>

      </header>
    </div>
  );
}

export default App;