/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import TableView from './tableView';
import DetailView from './detailView';

const trackOrderIndexView = ({ location }) => {
  const pairs = queryString.parse(location.search);
  const currentView = pairs.view && pairs.view === 'detail' ? <DetailView /> : <TableView />;
  return (<div>{currentView}</div>);
};


const TrackOrderIndexView = withRouter((trackOrderIndexView));
export default TrackOrderIndexView;
