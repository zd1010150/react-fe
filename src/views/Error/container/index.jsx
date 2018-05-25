/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import classNames from 'classnames/bind';
import { ERROR_404 } from '../flow/pageAction';
import Error404 from './404';
import styles from '../error.less';


const cx = classNames.bind(styles);

class ErrorIndexView extends React.Component {
  getView(props) {
    const { location } = props;
    const pairs = queryString.parse(location.search);
    if (_.isEmpty(pairs.action)) return <Error404 />;
    switch (pairs.action) {
      case ERROR_404:
        return <Error404 />;
      default:
        return <Error404 />;
    }
  }
  render() {
    return (<div className={cx('error-wrapper')}>{this.getView(this.props)}</div>);
  }
}


export default withRouter(ErrorIndexView);
