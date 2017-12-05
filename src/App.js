import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import './App.css';
import I18n from './i18n/index';
import Layout from './components/layout';
import { TopPanel,
  HeaderContent,
  HeaderNav,
  LeftSideNav,
  MainContent,
  Footer,
  CopyRight,
  Notification } from './views/index';

// import { baseUrl } from './config/env.config.js';


const store = configureStore();
store.subscribe(() => {
  console.log('redux store ===', store.getState()); // 打印redux中的state
});
// topPanel, headerContent, headerNav, leftSiderNav, mainContent, footer, notification,
const App = () => (
  <Provider store={store}>
    <I18n>
      <BrowserRouter>
        <div className="App">
          <Layout
            topPanel={<TopPanel />}
            headerContent={<HeaderContent />}
            notification={<Notification />}
            headerNav={<HeaderNav />}
            leftSiderNav={<LeftSideNav />}
            mainContent={<MainContent />}
            footer={<Footer />}
            copyRight={<CopyRight />}
          />
        </div>
      </BrowserRouter>
    </I18n>
  </Provider>
);


export default App;
