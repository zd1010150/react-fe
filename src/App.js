import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/page/index'
import { About, Inbox, Todo,Game } from './views/index'

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


class App extends Component {
  render() {
    let other = ( <div><header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                  </header>
                  <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                  </p>
                  </div>
                )
    return (
      <div className="App">
        { other }
        < Header />

      <div>
          <Switch>
           <Route path="/about" component={About}/>
              <Route path="/inbox" component={Inbox}/>
              <Route path="/todo" component={Todo}/>
              <Route path="/game" component={Game}/>
          </Switch>

      </div>

      </div>
    )
  }
}

export default App;
