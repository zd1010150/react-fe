/* eslint-disable no-shadow */

import { connect } from 'react-redux';

import Dialog from '../component/dialog';
import { fetchProvince, setEditProvince } from '../flow/action';
import { getCities } from '../flow/reselect';

const mapStateToProps = ({ global, ui }) => ({
  language: global.language,
  interests: global.settings.interests,
  group: global.settings.subGroup,
  countries: global.settings.countries,
  provinces: ui.userEdit.provinces,
  cities: getCities({ ui }),
});
const mapDispatchToProps = {
  fetchProvince,
  setEditProvince,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
