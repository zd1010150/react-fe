/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import TableView from './tableView';
import DetailView from './detailView';

const trackOrderIndexView = () => (
  <Switch>
    <Route path="/" component={TableView} />
    <Route path="/detail" component={DetailView} />
  </Switch>
);


const TrackOrderIndexView = withRouter((trackOrderIndexView));
export default TrackOrderIndexView;
