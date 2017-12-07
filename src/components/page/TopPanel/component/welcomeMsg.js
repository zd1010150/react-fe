/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';

const welcomeMsgView = ({ intl, account }) => {
  const { formatMessage } = intl;
  return (
    <div data-role="welcomeMsg">
      <span> { formatMessage({ id: 'global.magento.welcomeMsg' }, { name: account.username })}</span>
    </div>
  );
};


welcomeMsgView.propTypes = {
  intl: intlShape.isRequired,
  account: PropTypes.objectOf(PropTypes.string).isRequired,
};

const Welcome = injectIntl(welcomeMsgView);
export default Welcome;
