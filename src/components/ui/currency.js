import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CURRENCY_SYMBOL } from 'config/app.config';
import _ from 'lodash';

const currency = ({ value, baseCurrency }) => <span>{CURRENCY_SYMBOL[baseCurrency.name]}{ _.floor(value, 3)}</span>;

currency.defaultProps = {
  baseCurrency: 'CNY',
  value: 1.0,
};
currency.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  baseCurrency: PropTypes.string,
};

const mapStateToProps = ({ global }) => ({
  baseCurrency: global.settings.baseCurrency,
});

export default connect(mapStateToProps)(currency);
