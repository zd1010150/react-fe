/* eslint-disable no-shadow */

import { connect } from 'react-redux';

import Dialog from '../component/dialog';


const mapStateToProps = ({ global }) => ({
  language: global.language,
  interests: global.settings.interests,
  group: global.settings.subGroup,
  countries: global.settings.countries,
  provinces: global.provinces,
});


export default connect(mapStateToProps)(Dialog);
