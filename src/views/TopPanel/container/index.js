import { connect } from 'react-redux';
import { toggleLanguage } from 'store/global/action';
import Language from '../component/language';


const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProp = {
  onChange: toggleLanguage,
};

const TopPanel = connect(mapStateToProps, mapDispatchToProp)(Language);
export default TopPanel;

