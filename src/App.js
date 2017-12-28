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
  ErrorNotification,
  Footer,
  CopyRight,
  Notification } from './components/page/index';

const store = configureStore();

// 在非生成环境，都打印redux中的state,以便于跟踪调试
document.cookie="token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmJyZWFrYWJsZXRlc3QuY29tL3YxL2lubmVyL2xvZ2luIiwiaWF0IjoxNTEzNjYxODQyLCJleHAiOjE1MjA4NjE4NDIsIm5iZiI6MTUxMzY2MTg0MiwianRpIjoiR3dmQlVpYVk1Qjc4Z1V3USIsInN1YiI6MSwicHJ2IjoiZTM5MTM1NWU0ZmRlMWNmMjFlZDcxYjgzNWUyZjMwNWNjNjdkN2NjNiJ9.NrFJxwIhACjnbhZlaKihcN6GfSWcaUU6B7fU53nTR9o; domain= .breakabletest.com; path=/ ;expires="+new Date('2018-12-18T02:45:19.308Z')
if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    console.log('redux store ===', store.getState());
  });
}
store.dispatch(fetchGlobalSetting()); // 获取所有的配置,页面中大多数数据请求都基于本配置
ErrorNotification(store);

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
