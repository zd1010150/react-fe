import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import logo from './logo.svg';
import './App.css';
import I18n from './i18n/index';
import { Nav } from './components/page/index';
import Layout from './components/layout';
import { About, Inbox, Game, Todo, Header } from './views/index';
// import { baseUrl } from './config/env.config.js';


const store = configureStore();
store.subscribe(() => {
  console.log('redux store ===', store.getState()); // 打印redux中的state
});


const App = () => {
  const sider = <Nav />,
    header = <Route path="/" component={Header} />,
    content = (<div>
      <Switch><Route path="/about" component={About} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/todo" component={Todo} />
        <Route path="/game" component={Game} />
      </Switch>
               </div>),
    footer = <div>this is footer</div>;
  return (
    <Provider store={store}>
      <I18n>
        <BrowserRouter>
          <div className="App">
            <Layout sider={sider} header={header} content={content} footer={footer} />
          </div>
        </BrowserRouter>
      </I18n>
    </Provider>
  );
};


export default App;
