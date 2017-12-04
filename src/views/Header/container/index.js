import { connect } from 'react-redux';
import Language from '../component/language';
import { toggleLanguage } from 'store/global/action';

const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProp = {
  onChange: toggleLanguage,
};

const HeaderLanguage = connect(mapStateToProps, mapDispatchToProp)(Language);
export default HeaderLanguage;
