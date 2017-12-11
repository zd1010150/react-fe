/* eslint-disable max-len,no-nested-ternary */
import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import getMsgByLanguage from 'src/utils/validateMessagesUtil';


const WrapperForm = (props) => {
  const lang = props.lang || 'zh';
  const AddForm = Form.create({ validateMessages: getMsgByLanguage(lang) })(injectIntl(props.form));
  return <AddForm {...props} />;
};
WrapperForm.propTypes = {
  lang: PropTypes.string,
};
WrapperForm.defaultProps = {
  lang: 'zh',
};
const mapState = ({ global }) => ({
  lang: global.language,
});
export default connect(mapState)(WrapperForm);
