/* eslint-disable react/prop-types,react/jsx-closing-tag-location,import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

// import classNames from 'classnames/bind';
// import styles from '../Leads.less';
import getMsgByLanguage from 'src/utils/validateMessagesUtil';
import { Upload } from 'src/components/ui/index';

class addForm extends React.Component {
  validate() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e[0];
    }
    return e && e.fileList;
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
    })(<Select style={{ width: 170 }}><Option value="weChat" key="weChat">{formatMessage({ id: 'global.form.weChat' })}</Option><Option value="QQ" key="qq">QQ</Option>
    </Select>);

    const groupSelector = getFieldDecorator('group', { initialValue: 'family' })(<Select key="group">{groups.map(item => <Option value={item.vaule} key={item.value}>{item.title}</Option>)}</Select>);

    const interestsSelector = getFieldDecorator('interests', { initialValue: 'health', type: 'array' })
    (<Select
      mode="multiple"
      style={{ width: '100%' }}
      key="interests"
    >{interests.map((item) => {
      debugger;
      return <Option value={item.vaule} key={item.value}>{item.title}</Option>;
    })}
    </Select>);


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
                type: 'number',
                min: 6,
                max: 20,
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
          {getFieldDecorator('socialMediaNumber', {
            rules: [{
              type: 'string',
              min: 4,
              max: 50,
            }],
          })(<Input addonBefore={socialMediaTypeSelector} style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.group' })}
        >
          { groupSelector }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.interests' })}
        >
          { interestsSelector }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.ui.button.upload' })}
        >
          { getFieldDecorator('idFront', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [{ required: true }],
          })(<Upload pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })} />) }

        </FormItem>
        <FormItem>
          { getFieldDecorator('idBack')(<Upload pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDBack' })} />) }
        </FormItem>
      </Form>
    );
  }
}
addForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


class WrapperForm extends React.Component {
  render() {
    const lang = this.props.language || 'zh';
    const AddForm = Form.create({ validateMessages: getMsgByLanguage(lang) })(injectIntl(addForm));
    return <AddForm {...this.props} ref={(instance) => { this.instance = instance; }} />;
  }
}

export default WrapperForm;
