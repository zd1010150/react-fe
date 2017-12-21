/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setPageTitle, setOrderUser } from 'store/global/action';
import queryString from 'query-string';
import Skeleton from '../component/skeleton/index';


class orderView extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const pairs = queryString.parse(location.search);
    this.state = {
      userId: (pairs && pairs.userId) || '',
    };
    this.props.setPageTitle('global.pageTitle.order');
    if (_.isEmpty(this.state.userId)) {
      this.props.setOrderUser(null);
    }
  }

  render() {
    return (
      <section className="section section-page">
        <div className="section-content"><Skeleton user={this.props.user || {}} setOrderUser={this.props.setOrderUser} /></div>
      </section>
    );
  }
}
orderView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};
const mapStateToProps = ({ global }) => ({
  user: global.orderUser,
});
const mapDispatchToProp = {
  setPageTitle,
  setOrderUser,
};

const OrderView = connect(mapStateToProps, mapDispatchToProp)(orderView);
export default OrderView;

