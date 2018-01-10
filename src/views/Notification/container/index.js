/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import _ from 'lodash';
import { Row, Col } from 'antd';
import styles from '../Notification.less';
import SuccessPayView from '../component/successPay';

const cx = classNames.bind(styles);
class notificationView extends React.Component {
  getViewBySearch(location) {
    const pairs = queryString.parse(location.search);
    if (!_.isEmpty(pairs.view)) {
      switch (pairs.view) {
        case 'successPay':
          return <SuccessPayView />;
        default:
          return '';
      }
    } return '';
  }
  render() {
    const { location } = this.props;
    return (
      <div className={cx('notification-content-wrapper')}>
        { this.getViewBySearch(location) }
      </div>
    );
  }
}

notificationView.propTypes = {
  location: PropTypes.object.isRequired,
};


const NotificationView = withRouter(notificationView);
export default NotificationView;
