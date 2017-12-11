// import React from 'react';
// import PropTypes from 'prop-types';
import { Form } from 'antd';
import { connect } from 'react-redux';
// import { intlShape, injectIntl } from 'react-intl';
import getMsgByLanguage from 'src/utils/validateMessagesUtil';
//
// class innerForm extends React.Component {
//   render() {
//     <Form hideRequiredMark={this.props.hideRequiredMark} layout={this.props.layout} onSubmit={this.props.onSubmit} intl={this.props.intl} form={this.props.form}>
//       { this.props.children }
//     </Form>;
//   }
// }
// const localForm = ({
//   language, hideRequiredMark, layout, onSubmit, children, intl,
// }) => Form.create({ validateMessages: getMsgByLanguage(language) })(injectIntl(<Form hideRequiredMark={hideRequiredMark} layout={layout} onSubmit={onSubmit} intl={this.props.intl} form={this.props.form}>
//   { this.props.children }
// </Form>);
//
// localForm.defaultProps = {
//   hideRequiredMark: false,
//   layout: 'horizontal',
//   onSubmit(e) { console.log(e); },
// };
// localForm.propTypes = {
//   hideRequiredMark: PropTypes.bool.isRequired,
//   layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
//   onSubmit: PropTypes.func.isRequired,
//   intl: intlShape.isRequired,
// };
//

 //export default {};
//

const WrappedRegistrationForm = ({ language }) => {
  return Form.create(getMsgByLanguage(language));
}
window.__store__.subscribe(()=>{
  let langauge = window.__store__.getState().global.language ;

  console.log()
})
function mapStateToProps(state) {
  return { language: state.global.language };
}
const LocalForm = connect(mapStateToProps)(WrappedRegistrationForm);
console.log(LocalForm)
export default LocalForm;

