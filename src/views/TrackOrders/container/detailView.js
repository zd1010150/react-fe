/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';

class trackOrderDetailView extends React.Component {
  componentDidMount() {
    const {
      setPageTitle,
    } = this.props;
    setPageTitle('global.pageTitle.trackOrderDetail');
  }
  render() {
    const {
      trackOrder,
    } = this.props;
    return (
      <section className="section section-page">
        <div className="section-header">
          {JSON.stringify(trackOrder)}
        </div>
      </section>
    );
  }
}
trackOrderDetailView.defaultProps = {
  trackOrder: {},
};
trackOrderDetailView.propTypes = {
  trackOrder: PropTypes.object,
};
const mapStateToProps = ({ trackOrders }) => ({
  trackOrder: trackOrders.trackOrder,
});
const mapDispatchToProp = {
  setPageTitle,
};

const TrackOrderDetailView = connect(mapStateToProps, mapDispatchToProp)(trackOrderDetailView);
export default TrackOrderDetailView;
