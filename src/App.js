import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import logo from './logo.svg';
import './App.css';
import I18n from './i18n/index';
import { Header } from './components/page/index';
import { About, Inbox, Game, Todo } from './views/index';
import { baseUrl } from './config/env.config.js';

const store = configureStore();
store.subscribe(() => {
  console.log('===', store.getState());
});


const App = () => {
  const other = (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.

      </p>
    </div>
  );
  return (
    <I18n>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            { other }
            <Header />
            <div>
              <Switch><Route path="/about" component={About} />
                <Route path="/inbox" component={Inbox} />
                <Route path="/todo" component={Todo(store)} />
                <Route path="/game" component={Game} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </I18n>
  );
};


export default App;
