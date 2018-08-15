/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './assets/less/index.less';
import { MainLayout, CmsLayout, ResultNotificationLayout, ErrorLayout } from './components/layout/index';
import { PageLoading } from "./components/page/index";
// topPanel, headerContent, headerNav, leftSiderNav, mainContent, footer, notification,
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/resultNotification" exact component={ResultNotificationLayout} />
          <Route path="/CMS" exact component={CmsLayout} />
          <Route path="/error" component={ErrorLayout} />
          <Route path="/" component={MainLayout} />

        </Switch>
        <PageLoading />
      </div>
    );
  }
}
export default App;

