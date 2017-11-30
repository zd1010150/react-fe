import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import  configureStore  from "./store/configureStore"

import logo from './logo.svg';
import './App.css';
import { Header } from './components/page/index'
import { About, Inbox, Todo,Game,Reddiposts } from './views/index'

const store = configureStore()
store.subscribe(()=>{
    console.log("===",store.getState())
})

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
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    { other }
                    < Header />
                    <div>
                        <Switch><Route path="/about" component={About}/>
                            <Route path="/inbox" component={Inbox}/>
                            <Route path="/todo" component={Todo(store)}/>
                            <Route path="/game" component={Game}/>
                            <Route path="/reddiposts" component={Reddiposts(store)}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    )
  }
}

export default App;
