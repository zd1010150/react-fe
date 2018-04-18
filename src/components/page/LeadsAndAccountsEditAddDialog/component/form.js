/* eslint-disable react/prop-types,react/jsx-closing-tag-location,import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { CHINA_CODE, SOCIAL_MEDIA } from 'config/app.config';
import { Upload } from 'components/ui/index';
import { getExistRule, validator } from 'utils/validateMessagesUtil';
import styles from '../dialog.less';


const cx = classNames.bind(styles);
class userForm extends React.Component {
  state = {
    checkIdNumber: this.ifCheckIDNumber(this.props),
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editObject !== this.editObject) {
      // this.setState({
      //   [SOCIAL_MEDIA.QQ]: nextProps.editObject.QQ,
      //   [SOCIAL_MEDIA.WECHAT]: nextProps.editObject.WECHAT,
      // });
    }
  }
  ifCheckIDNumber(props) {
    if (_.isEmpty(props && props.editObject)) {
      return (props.countries && props.countries[0].code) === CHINA_CODE;
    }
    return props.editObject.country === CHINA_CODE;
  }
  handleCountryChange(countryCode) {
    const checkIdNumber = countryCode === CHINA_CODE;
    this.setState({
      checkIdNumber,
    }, () => {
      this.props.form.resetFields(['idNumber']);
      if (checkIdNumber) {
        this.props.form.validateFields(['idNumber'], { force: true });
      }
    });
  }
  socialTypeChange(mediaType) {
    this.props.socialTypeChange(mediaType);
  }
  socialNumberChange(e) {
    const mediaNumber = e.target.value;
    this.props.socialNumberChange(mediaNumber);
  }
  render() {
    const { language, currentSocialType } = this.props;
    const { Item: FormItem } = Form;
    const { Option } = Select;
    const { formatMessage } = this.props.intl;
    const { getFieldDecorator } = this.props.form;
    const {
      editObject, canEdit, group, interests, showID, countries,
    } = this.props;
    const disabled = !canEdit;
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
    const socialMediaTypeSelector = getFieldDecorator('socialMediaType', {
      initialValue: currentSocialType,
    })(<Select getPopupContainer={() => document.getElementById('addAndEditDialog')}  style={{ width: 170 }} onChange={val => this.socialTypeChange(val)}>
      <Option value={SOCIAL_MEDIA.WECHAT} key={SOCIAL_MEDIA.WECHAT}>{formatMessage({ id: 'global.form.weChat' })}</Option>
      <Option value={SOCIAL_MEDIA.QQ} key={SOCIAL_MEDIA.QQ}>QQ</Option>
    </Select>);

    const groupSelector = getFieldDecorator('group', { initialValue: editObject.group || ((!_.isEmpty(group[0])) && group[0].id) || '' })(<Select getPopupContainer={() => document.getElementById('addAndEditDialog')} disabled={disabled} key="group">{group.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}</Select>);
    const initalIntereste = _.isEmpty(editObject.interests) ? [] : (_.isEmpty(editObject.interests[0]) ? [] : editObject.interests);
    const interestsSelector = getFieldDecorator('interests', { initialValue: initalIntereste })(<Select
      disabled={disabled}
      style={{ width: '100%' }}
      key="interests"
      mode="multiple"
      getPopupContainer={() => document.getElementById('addAndEditDialog')}
    >{interests.map(item => <Option value={`${item.id}`} key={item.id}>{item.name}</Option>)}
    </Select>);


    const countriesEl = getFieldDecorator('country', { initialValue: editObject.country || (countries[0] && countries[0].code) || '' })(<Select getPopupContainer={() => document.getElementById('addAndEditDialog')} disabled={disabled} onChange={(countryCode) => { this.handleCountryChange(countryCode); }}>
      {
          countries.map(item => <Option value={item.code} key={item.code}>{item.name}</Option>)
        }
    </Select>);
    return (
      <Form onSubmit={(e) => { this.props.onSubmit(); }}>
        <FormItem>
          {
            getFieldDecorator('id', {
              initialValue: editObject.id || '',
            })(<Input type="hidden" />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.lastName' })}
        >
          {
            getFieldDecorator('lastName', {
              initialValue: editObject.lastName || '',
              rules: [
                getExistRule('required', 'lastName', language, { required: true }),
                {
                  validator: validator.between(1, 50, language),
                },
              ],
            })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.firstName' })}
        >
          {
            getFieldDecorator('firstName', {
              initialValue: editObject.firstName || '',
              rules: [
                getExistRule('required', 'firstName', language, { required: true }),
                {
                  validator: validator.between(1, 50, language),
                },
              ],
            })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.phone' })}
        >
          {
            getFieldDecorator('phone', {
              initialValue: editObject.phone || '',
              rules: [
                getExistRule('required', 'phone', language, { required: true }),
                {
                  validator: validator.phone(language),
                }],
            })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.email' })}
        >
          {
            getFieldDecorator('email', {
              initialValue: editObject.email || '',
              rules: [getExistRule('email', 'email', language)],
            })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.address' })}
        >
          {
            getFieldDecorator('address', {
              initialValue: editObject.address || '',
              rules: [
                {
                  validator: validator.between(1, 150, language),
                }],
            })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.city' })}
        >
          {
            getFieldDecorator('city', {
              initialValue: editObject.city || '',
              rules: [{
                validator: validator.between(1, 150, language),
              }],
            })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.state' })}
        >
          {
            getFieldDecorator('state', {
              initialValue: editObject.state || '',
              rules: [{
                validator: validator.between(1, 150, language),
              }],
            })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.country' })}
        >
          { countriesEl}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.zipCode' })}
        >
          {
            getFieldDecorator('zipCode', {
              initialValue: editObject.zipCode || '',
              rules: [{
                validator: validator.zipCode(language),
              }],
            })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.idNumber' })}
        >
          {
            getFieldDecorator('idNumber', {
              initialValue: editObject.idNumber || '',
              rules: [
                getExistRule('required', 'idNumber', language, { required: this.state.checkIdNumber }),
                this.state.checkIdNumber ? { validator: validator.idNumber(language) } : {},
              ],
            })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.interests' })}
        >
          { interestsSelector }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.group' })}
        >
          { groupSelector }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.socialMedia' })}
        >
          <Input
            addonBefore={socialMediaTypeSelector}
            style={{ width: '100%' }}
            value={this.props[this.props.currentSocialType]}
            disabled={disabled}
            onChange={e => this.socialNumberChange(e)}
            onBlur={e => this.socialNumberChange(e)}
          />
        </FormItem>


        <div className={classNames(cx('id-wrapper'), showID ? 'show' : 'hidden')}>
          <FormItem
            className={cx('id-front')}
            {...formItemLayout}
            label={formatMessage({ id: 'global.ui.button.upload' })}
          >
            { getFieldDecorator('idFront', {
              initialValue: editObject.idFront || '',
            })(<Upload disabled={disabled} file={editObject.idFront || null} pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })} />) }

          </FormItem>
          <FormItem
            className={cx('id-back')}

          >
            { getFieldDecorator('idBack', {
              initialValue: editObject.idBack || '',
            })(<Upload disabled={disabled} file={editObject.idBack || null} pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDBack' })} />) }
          </FormItem>
        </div>
      </Form>
    );
  }
}
userForm.defaultProps = {
  editObject: {},
  canEdit: false,
  showID: false,
  interests: [],
  group: [],
  countries: [],
};
userForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  socialNumberChange: PropTypes.func.isRequired,
  socialTypeChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  editObject: PropTypes.object,
  canEdit: PropTypes.bool,
  interests: PropTypes.array,
  group: PropTypes.array,
  countries: PropTypes.array,
  showID: PropTypes.bool,
  QQ: PropTypes.string.isRequired,
  weChat: PropTypes.string.isRequired,
  currentSocialType: PropTypes.string.isRequired,
};

export default Form.create()(injectIntl(userForm));
