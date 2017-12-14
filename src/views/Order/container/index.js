/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle, setOrderUser } from 'store/global/action';
import queryString from 'query-string';
import Skeleton from '../component/skeleton';
import _ from 'lodash';

class orderView extends React.Component {
  constructor(props) {
    super(props);
    const { location, setOrderUser } = this.props;
    const pairs = queryString.parse(location.search);
    this.state = {
      userId: (pairs && pairs.userId) || '',
    };
    if (_.isEmpty(this.state.userId)) {
      setOrderUser(null);
    }
  }
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.order');
  }
  render() {
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

