/* eslint-disable react/prop-types,react/jsx-closing-tag-location,import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Tabs } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { CHINA_CODE, SOCIAL_MEDIA } from 'config/app.config';
import { Upload } from 'components/ui/index';
import { getExistRule, validator } from 'utils/validateMessagesUtil';
import styles from '../dialog.less';


const cx = classNames.bind(styles);
const { TabPane } = Tabs;
const { Item: FormItem } = Form;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

class userForm extends React.Component {
  state = {
    checkIdNumber: this.ifCheckIDNumber(this.props),
    selectedState: '',
    selectedCity: '',
    cities: [],
  }
  componentDidMount() {
    this.initStateAndCity(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editObject !== this.props.editObject) {
      this.initStateAndCity(nextProps);
    }
  }
  initStateAndCity(props) {
    const { editObject, provinces } = this.props;
    if(editObject.country === CHINA_CODE){
      const selectedState = this.getProvince(editObject.state, provinces);
      const cities = this.getCities(editObject.state, provinces);
      this.setState({
        cities,
        selectedState,
        selectedCity: editObject.city || (_.isEmpty(cities) ? '' : cities[0].id),
      });
    }

  }
  getCities(selectedProvince, provinces) {
    if (_.isEmpty(provinces)) {
      return [];
    }
    const province = provinces.filter(p => Number(p.id) === Number(selectedProvince));
    return _.isEmpty(province) ? (provinces[0].cities || []) : province[0].cities;
  }
  getProvince(province, provinces) {
    if (province === null || province === undefined || `${province}`.length < 1) {
      if (!_.isEmpty(provinces)) {
        return provinces[0].id;
      }
    }
    if (`${province}`.length > 0) {
      return province;
    }
    return '';
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
        this.props.form.setFieldsValue({ state: this.state.selectedState, city: this.state.selectedCity });
      } else {
        this.props.form.setFieldsValue({
          state: '',
          city: '',
        });
      }
    });
  }

  handleProvinceChange(proviceId) {
    const cities = this.getCities(proviceId, this.props.provinces);
    this.setState({
      selectedState: proviceId,
      cities,
      selectedCity: cities[0].id
    });
    this.props.form.setFieldsValue({ city: cities[0].id });
  }
  handleCityChange(cityId) {
    this.setState({
      selectedCity: cityId,
    });
  }
  socialTypeChange(mediaType) {
    this.props.socialTypeChange(mediaType);
  }

  socialNumberChange(e) {
    const mediaNumber = e.target.value;
    this.props.socialNumberChange(mediaNumber);
  }

  renderAddressFields() {
    const {
      editObject, provinces, intl, language, countries, form, canEdit,
    } = this.props;
    const { cities } = this.state;
    const { formatMessage } = intl;
    const { getFieldDecorator } = form;
    const disabled = !canEdit;

    const countriesSelectEl = getFieldDecorator('country', { initialValue: editObject.country || (countries[0] && countries[0].code) || '' })(<Select
      getPopupContainer={() => document.getElementById('addAndEditDialog')}
      disabled={disabled}
      onChange={(countryCode) => {
                this.handleCountryChange(countryCode);
              }}
    >
      {
          countries.map(item => <Option value={item.code} key={item.code}>{item.name}</Option>)
        }
    </Select>);

    const getStateEl = () => {
      if (this.state.checkIdNumber) {
        return getFieldDecorator('state', { initialValue: Number(editObject.state) || this.state.selectedState })(<Select
          getPopupContainer={() => document.getElementById('addAndEditDialog')}
          disabled={disabled}
          onChange={(provinceId) => {
                    this.handleProvinceChange(provinceId, provinces);
                  }}
        >
          {
              provinces.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
            }
        </Select>);
      }
      return getFieldDecorator('state', {
        initialValue: editObject.state || '',
        rules: [{
          validator: validator.between(1, 150, language),
        }],
      })(<Input disabled={disabled} placeholder={formatMessage({ id: 'global.ui.input.stateInputPlaceHolder' })} />);
    };
    const stateEl = (<FormItem
      {...formItemLayout}
      label={formatMessage({ id: 'global.form.state' })}
      key="state"
    >
      {
        getStateEl()
      }</FormItem>);
    const getCityEl = () => {
      if (this.state.checkIdNumber) {
        return getFieldDecorator('city', { initialValue: Number(editObject.city) || Number(this.state.selectedCity) })(<Select
          getPopupContainer={() => document.getElementById('addAndEditDialog')}
          disabled={disabled}
          onChange={(cityId) => {
            this.handleCityChange(cityId);
          }}
        >
          { cities.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>) }
        </Select>);
      }
      return getFieldDecorator('city', {
        initialValue: editObject.city || '',
        rules: [{
          validator: validator.between(1, 150, language),
        }],
      })(<Input disabled={disabled} placeholder={formatMessage({ id: 'global.ui.input.cityInputPlaceHolder' })} />);
    };
    const cityEl = (<FormItem
      {...formItemLayout}
      label={formatMessage({ id: 'global.form.city' })}
      key="city"
    >
      {
        getCityEl()
      }
    </FormItem>);
    const countryEl = (<FormItem
      {...formItemLayout}
      label={formatMessage({ id: 'global.form.countryArea' })}
      key="country"
    >
      {countriesSelectEl}
    </FormItem>);
    const addressEl = (<FormItem
      {...formItemLayout}
      label={formatMessage({ id: 'global.form.address' })}
      key="address"
    >
      {
        getFieldDecorator('address', {
          initialValue: editObject.address || '',
          rules: [
            {
              validator: validator.between(1, 150, language),
            }],
        })(<Input disabled={disabled} placeholder={formatMessage({ id: 'global.ui.input.addressPlaceHolder' })} />)}
    </FormItem>);

    const addressELs = [countryEl, stateEl, cityEl, addressEl];
    if (language === 'en') {
      addressELs.reverse();
    }
    return addressELs;
  }

  renderNameFields() {
    const {
      editObject, intl, language, form, canEdit,
    } = this.props;
    const { formatMessage } = intl;
    const { getFieldDecorator } = form;
    const disabled = !canEdit;
    const firstNameEl = (<FormItem
      {...formItemLayout}
      label={formatMessage({ id: 'global.form.firstName' })}
      key="firstName"
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
        })(<Input disabled={disabled} placeholder={formatMessage({ id: 'global.ui.input.firstNamePlaceHolder' })} />)}
    </FormItem>);
    const lastNameEl = (<FormItem
      {...formItemLayout}
      label={formatMessage({ id: 'global.form.lastName' })}
      key="lastName"
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
        })(<Input disabled={disabled} placeholder={formatMessage({ id: 'global.ui.input.lastNamePlaceHolder' })} />)}
    </FormItem>);
    const nameEls = [lastNameEl, firstNameEl];
    if (language === 'en') {
      nameEls.reverse();
    }
    return nameEls;
  }

  render() {
    const {
      language,
      currentSocialType,
      editObject,
      canEdit,
      group,
      interests,
      showID,
      intl,
      form,
    } = this.props;


    const { formatMessage } = intl;
    const { getFieldDecorator } = form;
    const disabled = !canEdit;

    const socialMediaTypeSelector = getFieldDecorator('socialMediaType', {
      initialValue: currentSocialType,
    })(<Select
      getPopupContainer={() => document.getElementById('addAndEditDialog')}
      style={{ width: 170 }}
      onChange={val => this.socialTypeChange(val)}
    >
      <Option
        value={SOCIAL_MEDIA.WECHAT}
        key={SOCIAL_MEDIA.WECHAT}
      >{formatMessage({ id: 'global.form.weChat' })}</Option>
      <Option value={SOCIAL_MEDIA.QQ} key={SOCIAL_MEDIA.QQ}>QQ</Option>
    </Select>);
    const groupSelector = getFieldDecorator('group', { initialValue: editObject.group || ((!_.isEmpty(group[0])) && group[0].id) || '' })(<Select
      getPopupContainer={() => document.getElementById('addAndEditDialog')}
      disabled={disabled}
      key="group"
    >{group.map(item => (<Option
      value={item.id}
      key={item.id}
    >{item.name}</Option>))}</Select>);
    const initalIntereste = _.isEmpty(editObject.interests) ? [] : (_.isEmpty(editObject.interests[0]) ? [] : editObject.interests);
    const interestsSelector = getFieldDecorator('interests', { initialValue: initalIntereste })(<Select
      disabled={disabled}
      style={{ width: '100%' }}
      key="interests"
      mode="multiple"
      getPopupContainer={() => document.getElementById('addAndEditDialog')}
    >{interests.map(item => (<Option
      value={`${item.id}`}
      key={item.id}
    >{item.name}</Option>))}
    </Select>);
    return (
      <Form onSubmit={() => {
        this.props.onSubmit();
      }}
      >
        <Tabs type="card" className="lead-account-edit-tab">
          <TabPane tab={formatMessage({ id: 'global.ui.tab.addressInfo' })} key="1" className={cx('tab-panel')}>
            {this.renderNameFields()}
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
            {this.renderAddressFields()}

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
            <div className={classNames(cx('id-wrapper'), showID ? 'show' : 'hidden')}>
              <FormItem
                className={cx('id-front')}
                {...formItemLayout}
                label={formatMessage({ id: 'global.ui.button.upload' })}
              >
                {getFieldDecorator('idFront', {
                  initialValue: editObject.idFront || '',
                })(<Upload
                  disabled={disabled}
                  file={editObject.idFront || null}
                  pictureQuantity={1}
                  uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })}
                />)}

              </FormItem>
              <FormItem className={cx('id-back')}>
                {getFieldDecorator('idBack', {
                  initialValue: editObject.idBack || '',
                })(<Upload
                  disabled={disabled}
                  file={editObject.idBack || null}
                  pictureQuantity={1}
                  uploadText={formatMessage({ id: 'page.Leads.uploadIDBack' })}
                />)}
              </FormItem>
            </div>
          </TabPane>
          <TabPane tab={formatMessage({ id: 'global.ui.tab.otherInfo' })} key="2" className={cx('tab-panel')}>
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
              label={formatMessage({ id: 'global.form.interests' })}
            >
              {interestsSelector}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'global.form.group' })}
            >
              {groupSelector}
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
          </TabPane>

        </Tabs>
        <FormItem>
          {
            getFieldDecorator('id', {
              initialValue: editObject.id || '',
            })(<Input type="hidden" />)
          }
        </FormItem>
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
  provinces: PropTypes.array.isRequired,
};

export default Form.create()(injectIntl(userForm));
