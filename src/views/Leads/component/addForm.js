/* eslint-disable react/prop-types,react/jsx-closing-tag-location,import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../Leads.less';
import { Upload } from 'src/components/ui/index';

import { getExistRule, getErrorMsg, validator } from 'src/utils/validateMessagesUtil';

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
    const { language } = this.props;
    const { Item: FormItem } = Form;
    const { Option } = Select;
    const cx = classNames.bind(styles);
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

    const groupSelector = getFieldDecorator('group', { initialValue: 'family' })(<Select key="group">{groups.map(item => <Option value={item.value} key={item.value}>{item.title}</Option>)}</Select>);

    const interestsSelector = getFieldDecorator('interests', { initialValue: 'health', type: 'array' })(<Select
      mode="multiple"
      style={{ width: '100%' }}
      key="interests"
    >{interests.map(item => <Option value={item.value} key={item.value}>{item.title}</Option>)}
    </Select>);

    const self = this;
    return (

      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.lastName' })}
        >
          {
            getFieldDecorator('lastName', {
            rules: [
              getExistRule('required', 'lastName', language, { required: true }),
              {
                validator: validator.between(3, 50, language),
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.firstName' })}
        >
          {
            getFieldDecorator('firstName', {
              rules: [
                getExistRule('required', 'firstName', language, { required: true }),
                {
                  validator: validator.between(3, 50, language),
                },
              ],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.phone' })}
        >
          {
            getFieldDecorator('phone', {
              rules: [
                getExistRule('required', 'phone', language, { required: true }),
                {
                  validator: validator.phone(language),
                }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.email' })}
        >
          {
            getFieldDecorator('email', {
              rules: [getExistRule('email', 'email', language)],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.address' })}
        >
          {
            getFieldDecorator('address', {
              rules: [
                {
                validator: validator.between(3, 150, language),
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
                validator: validator.between(3, 150, language),
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
                validator: validator.between(3, 150, language),
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
                validator: validator.between(3, 150, language),
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
                  validator: validator.zipCode(language),
                }],
            })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.socialMedia' })}
        >
          {getFieldDecorator('socialMediaNumber', {
            rules: [{
              validator: validator.between(3, 80, language),
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
        <div className={cx('id-wrapper')}>
          <FormItem
            className={cx('id-front')}
            {...formItemLayout}
            label={formatMessage({ id: 'global.ui.button.upload' })}
          >
            { getFieldDecorator('idFront', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(<Upload pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })} />) }

          </FormItem>
          <FormItem
            className={cx('id-back')}

          >
            { getFieldDecorator('idBack', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(<Upload pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDBack' })} />) }
          </FormItem>
        </div>

      </Form>
    );
  }
}
addForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};


class WrapperForm extends React.Component {
  render() {
    // const lang = this.props.language || 'zh';
    const AddForm = Form.create()(injectIntl(addForm));
    return <AddForm {...this.props} ref={(instance) => { this.instance = instance; }} />;
  }
}

export default WrapperForm;
