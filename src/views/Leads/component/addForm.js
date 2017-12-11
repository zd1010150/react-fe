import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Icon, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
// import classNames from 'classnames/bind';
// import styles from '../Leads.less';
import getMsgByLanguage from 'src/utils/validateMessagesUtil';
import { Upload } from 'src/components/ui/index';
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
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    // mock 数据
    const groups = [{ title: 'family', value: 'family' }, { title: 'colleague', value: 'colleague' }];
    const interests = [{ title: 'health', value: 'health' }, { title: 'mastic', value: 'mastic' }];

    const socialMediaTypeSelector = getFieldDecorator('socialMediaType', {
      initialValue: 'weChat',
    })(<Select style={{ width: 70 }}>
      <Option value="weChat">{formatMessage({ id: 'global.form.weChat' })}</Option>
      <Option value="QQ">QQ</Option>
    </Select>);

    const groupSelector = getFieldDecorator('group')(<Select>
      {
          groups.map((item, index) => <Option value={item.vaule} key={index}>{item.title}</Option>)
        }
    </Select>);

    const interestsSelector = getFieldDecorator('interests')(<Select
      mode="multiple"
      style={{ width: '100%' }}
    >{interests.map((item, index) => <Option value={item.vaule} key={index}>{item.title}</Option>)}
    </Select>);

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{ formatMessage({ id: 'global.ui.button.upload' }) }</div>
      </div>
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.lastName' })}
        >
          {
            getFieldDecorator('lastName', {
            rules: [{
              required: true,
            }],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.firstName' })}
        >
          {
            getFieldDecorator('firstName', {
              rules: [{
                required: true,
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.phone' })}
        >
          {
            getFieldDecorator('phone', {
              rules: [{
                required: true,
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.email' })}
        >
          {
            getFieldDecorator('email', {
              rules: [{
                type: 'email',
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.address' })}
        >
          {
            getFieldDecorator('address', {
              rules: [{
                type: 'string',
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.city' })}
        >
          {
            getFieldDecorator('city', {
              rules: [{
                type: 'string',
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.state' })}
        >
          {
            getFieldDecorator('state', {
              rules: [{
                type: 'string',
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.country' })}
        >
          {
            getFieldDecorator('country', {
              rules: [{
                type: 'string',
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.zipCode' })}
        >
          {
            getFieldDecorator('zipCode', {
              rules: [{
                type: 'number',
              }, {
                type: 'string',
                len: 6,
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.socialMedia' })}
        >
          { socialMediaTypeSelector }
          {
            getFieldDecorator('socialMediaNumber', {
              rules: [{
                type: 'string',
                min: 4,
                max: 50,
              }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.group' })}
        >
          { groupSelector }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.ui.button.upload' })}
        >
          { getFieldDecorator('idFront')(<Upload pictureQuantity={1} uploadText={formatMessage({ id:'page.Leads.uploadIDFront' })}/>) }
          { getFieldDecorator('idBack')(<Upload pictureQuantity={1} uploadText={formatMessage({ id:'page.Leads.uploadIDBack' })}/>) }
        </FormItem>

      </Form>
    );
  }
}
addForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
console.log(getMsgByLanguage('zh'), '====***');

const WrapperForm = (props) => {
  const lang = props.lang || 'zh';
  const AddForm = Form.create({ validateMessages: getMsgByLanguage(lang) })(injectIntl(addForm));
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

