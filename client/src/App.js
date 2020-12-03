import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Items from './components/Items';
import AddItems from './components/AddItems';
import Basket from './components/Basket';
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Items} />
        <Route path='/add' exact component={AddItems} />
        <Route path='/basket' exact component={Basket} />
        <Route path='/orders' exact component={Checkout} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
