import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
// import classNames from 'classnames/bind';
// import styles from '../Leads.less';
// import getMsgByLanguage from 'src/utils/validateMessagesUtil';
import LocalFrom from 'src/components/ui/form';

class addForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  validate() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  render() {
    const { Item: FormItem } = Form;
    const { Option } = Select;
    //  const cx = classNames.bind(styles);
    const { formatMessage } = this.props.intl;
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.form, '====');
    // const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0,
    //     },
    //     sm: {
    //       span: 16,
    //       offset: 8,
    //     },
    //   },
    // };


    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.lastName' })}
        >
          {
            getFieldDecorator('email', {
            rules: [{
              type: 'email',
            }, {
              required: true,
            }],
          })(<Input />)}
        </FormItem>


      </Form>
    );
  }
}
addForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// debugger;
// const AddForm = connect(mapStateToProps)(addForm);
// console.log(AddForm)
// const create = (form, language) => {
//
// }

// const formProxy = ({ language, ...other }) => (injectIntl(<addForm {...other} />);

window.__store__.subscribe(()=>{
  let langauge = window.__store__.getState().global.language ;

  console.log()
})
const AddForm = LocalFrom(addForm);

export default AddForm;
