import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleLanguage } from 'store/global/action';
import Language from '../component/language';
import TopStaticNav from '../component/topStaticNav';

const topPanel = ({ language, onChange }) => (
  <div><Language language={language} onChange={onChange} /><TopStaticNav /></div>
);

topPanel.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProp = {
  onChange: toggleLanguage,
};

const TopPanel = connect(mapStateToProps, mapDispatchToProp)(topPanel);
export default TopPanel;

