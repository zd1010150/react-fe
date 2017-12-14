/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setPageTitle, setOrderUser } from 'store/global/action';
import queryString from 'query-string';
import Skeleton from '../component/skeleton';


class orderView extends React.Component {
  constructor(props) {
    console.log('container in construector');
    super(props);
    const { location } = this.props;
    const pairs = queryString.parse(location.search);
    this.state = {
      userId: (pairs && pairs.userId) || '',
    };
    this.props.setPageTitle('global.pageTitle.order');
    if (_.isEmpty(this.state.userId)) {
      console.log('uerid is empty in consturter ');
      this.props.setOrderUser(null);
    }
  }
  componentDidMount() {
    console.log('container did mount:', this.props.user);
  }
  render() {
    console.log('container render');
    const { language } = this.props;
    return (
      <section className="section section-page">
        <div className="section-content"><Skeleton user={this.props.user || {}} setOrderUser={this.props.setOrderUser} /></div>
      </section>
    );
  }
}
orderView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
  user: global.orderUser,
});
const mapDispatchToProp = {
  setPageTitle,
  setOrderUser,
};

const OrderView = connect(mapStateToProps, mapDispatchToProp)(orderView);
export default OrderView;

