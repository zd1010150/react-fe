import React from 'react';
import PropTypes from 'prop-types';

import { IntlProvider } from 'react-intl';
import { getStore } from '../utils/localStorage';

const language = getStore('language') || navigator.language;
const I18n = ({ children }) => <IntlProvider local={language}> { children }</IntlProvider>;

I18n.propTypes = {
  children: PropTypes.element.isRequired,
}
export default I18n;
