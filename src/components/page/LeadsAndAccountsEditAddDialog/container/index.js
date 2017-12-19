/* eslint-disable no-shadow */

import { connect } from 'react-redux';

import Dialog from '../component/dialog';


const mapStateToProps = ({ global }) => ({
  language: global.language,
  interests: global.settings.subCategory,
  group: global.settings.subGroup,
});


export default connect(mapStateToProps)(Dialog);
