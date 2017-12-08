import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

const PageTitle = ({ pageTitle, intl }) => {
  const { formatMessage } = intl;
  return (
    <h1>{formatMessage({ id: pageTitle }) }</h1>
  );
};


PageTitle.propTypes = {
  intl: intlShape.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default PageTitle;

