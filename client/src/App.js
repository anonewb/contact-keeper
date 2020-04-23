import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <Route path='/' exact>
                    <Home />
                  </Route>
                  <Route path='/about' exact>
                    <About />
                  </Route>
                  <Route exact path='/register' component={Register}></Route>
                  <Route exact path='/login' component={Login}></Route>
                </Switch>
              </div>
            </>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
