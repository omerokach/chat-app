import './App.css';
import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Join from './components/join/Join';
import Chat from './components/Chat/Chat';

function App() {

  return (
 <Router>
   <Switch>
   <Route exact path='/' component={Join} />
   <Route exact path='/chat' component={Chat}/>
   </Switch>
 </Router>
  );
}

export default App;
