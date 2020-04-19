import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContactState from './context/contact/ContactState';
import './App.css';

function App() {
  return (
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
            </Switch>
          </div>
        </>
      </Router>
    </ContactState>
  );
}

export default App;
