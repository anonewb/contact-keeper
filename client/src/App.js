import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

function App() {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route path='/' exact>
                  <Home />
                </Route>
                <Route path='/about' exact>
                  <About />
                </Route>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </>
        </Router>
      </ContactState>
    </AuthState>
  );
}

export default App;
