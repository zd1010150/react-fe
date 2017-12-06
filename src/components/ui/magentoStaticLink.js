import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { getAbsolutePath } from '../../config/magento.config';


const magentoStaticLink = ({
  href, titleId, aClass, language, intl,
}) => {
  const { formatMessage } = intl;
  console.log(href,"===")
  return (<a href={getAbsolutePath(href, language)} className={aClass} target="_self">{formatMessage({ id: titleId })}</a>);
};

magentoStaticLink.defaultProps = {
  aClass: '',
}
magentoStaticLink.propTypes = {
  href: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  aClass: PropTypes.string,
  language: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

function mapStateToProps(state) {
  return { language: state.global.language };
}
const MagentoStaticLink = injectIntl(connect(mapStateToProps)(magentoStaticLink));
export default MagentoStaticLink;

