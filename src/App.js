/* eslint-disable no-underscore-dangle */
import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { fetchGlobalSetting } from './store/global/action';
import './assets/less/index.less';
import I18n from './i18n/index';
import { MainLayout } from './components/layout/index';
import { TopPanel,
  HeaderContent,
  HeaderNav,
  LeftSideNav,
  MainContent,
  Footer,
  CopyRight,
  Notification } from './components/page/index';
const store = configureStore();

// 在非生成环境，都打印redux中的state,以便于跟踪调试

if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    console.log('redux store ===', store.getState());
  });
}
store.dispatch(fetchGlobalSetting()); // 获取所有的配置,页面中大多数数据请求都基于本配置

window.__store__ = store;
// topPanel, headerContent, headerNav, leftSiderNav, mainContent, footer, notification,
const App = () => (
  <Provider store={store}>
    <I18n>
      <HashRouter>
        <div className="App">
          <MainLayout
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
      </HashRouter>
    </I18n>
  </Provider>
);

export default App;
