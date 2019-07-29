import React, { Component } from 'react';
import classes from './App.module.css';
import Roulette from '../components/Roulette/Roulette';

class App extends Component{

  render() {
    return (
      <div className={classes.App}>
        <Roulette />
      </div>
    )
  }
}

export default App;
