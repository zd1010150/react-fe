/* eslint-disable no-underscore-dangle */
import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import CMS from 'views/CMS/index';
import configureStore from './store/configureStore';
import { fetchGlobalSetting } from './store/global/action';
import './assets/less/index.less';
import I18n from './i18n/index';
import { MainLayout, CmsLayout } from './components/layout/index';
import { ErrorNotification } from './components/page/index';

const store = configureStore();

// 在非生成环境，都打印redux中的state,以便于跟踪调试
document.cookie = `token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmJyZWFrYWJsZXRlc3QuY29tL3YxL2lubmVyL2xvZ2luIiwiaWF0IjoxNTE0OTc4Njk3LCJleHAiOjE1MjIxNzg2OTcsIm5iZiI6MTUxNDk3ODY5NywianRpIjoiMTMxYkhZZTJ0RFlISWxnSyIsInN1YiI6MSwicHJ2IjoiZTM5MTM1NWU0ZmRlMWNmMjFlZDcxYjgzNWUyZjMwNWNjNjdkN2NjNiJ9.iGmli5nQrRerIR7N0lkHuPqLvgFxHhjPs7rc21Z-Knw; domain= .breakabletest.com; path=/ ;expires=${new Date('2018-12-18T02:45:19.308Z')}`;
if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    console.log('redux store ===', store.getState());
  });
}
window.__store__ = store;
store.dispatch(fetchGlobalSetting()); // 获取所有的配置,页面中大多数数据请求都基于本配置
ErrorNotification(store);


// topPanel, headerContent, headerNav, leftSiderNav, mainContent, footer, notification,
const App = () => (
  <Provider store={store}>
    <I18n>
      <HashRouter>
        <div className="App">
          <Switch>
            <Route path="/CMS" exact component={CmsLayout} />
            <Route path="/" component={MainLayout} />
          </Switch>
        </div>
      </HashRouter>
    </I18n>
  </Provider>
);

export default App;
