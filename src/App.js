import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from './views/Todo'
import { Game } from './components/Game'
class App extends Component {
  render() {
    let other = ( <div><header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                  </header>
                  <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                  </p>
                  <Todolist / >
                  </div>
                )
    return (
      <div className="App">
        { other }
        <Game / >
      </div>
    );
  }
}

export default App;
