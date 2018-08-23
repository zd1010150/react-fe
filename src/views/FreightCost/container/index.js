/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../index.less';

class FreightCostView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.freightCost');
  }
  render() {
    const { intl, freightSettings } = this.props;
    const { formatMessage } = intl;
    const cx = classNames.bind(styles);
    return (
      <section className="section section-page">
        <div className="section-content">
          <table className={cx('freight-table')}>
            <thead>
              <tr>
                <th> { formatMessage({ id: 'page.FreightCost.freightName' })}</th>
                <th>{ formatMessage({ id: 'page.FreightCost.cost' })}</th>
                <th>{ formatMessage({ id: 'page.FreightCost.limit' })}</th>
                <th>{ formatMessage({ id: 'page.FreightCost.minIncrement' })}</th>
              </tr>
            </thead>
            <tbody>
              {
              freightSettings.map(f => (<tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.cost}</td>
                <td>{f.mini_weight}</td>
                <td>{f.increment}</td>
                                        </tr>))
            }
            </tbody>
          </table>

        </div>

      </section>
    );
  }
}
FreightCostView.defaultProps = {
  freightSettings: [],
};
FreightCostView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  freightSettings: PropTypes.array,
};
const mapStateToProps = ({ global }) => ({
  freightSettings: global.settings.freightSetting,
});
const mapDispatchToProp = {
  setPageTitle,
};

export default connect(mapStateToProps, mapDispatchToProp)(injectIntl(FreightCostView));

