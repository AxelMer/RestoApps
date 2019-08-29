import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './module/home';
import AppHeader from './module/appHeader';
import Cuenta from './module/Cuenta';
import Salon from './module/Salon';
import Menu from './module/Menu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Router>
        <AppHeader />
          <Switch>
            <Route exact path="/" component={Home} />
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
