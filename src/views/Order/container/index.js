/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import queryString from 'query-string';
import Skeleton from '../component/skeleton';

class orderView extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const pairs = queryString.parse(location.search);
    this.state = {
      userId: (pairs && pairs.userId) || '',
    };
  }
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.order');
  }
  render() {
    const { language } = this.props;
    return (
      <section className="section section-page">
        <div className="section-content"><Skeleton userId={this.state.userId} /></div>
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
});
const mapDispatchToProp = {
  setPageTitle,
};

const OrderView = connect(mapStateToProps, mapDispatchToProp)(orderView);
export default OrderView;

