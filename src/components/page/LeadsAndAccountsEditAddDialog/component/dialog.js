import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import _ from 'lodash';
import { SOCIAL_MEDIA } from 'config/app.config';
// import classNames from 'classnames/bind';
import operateTypes from '../flow/operateType';
import UserForm from './form';

class userDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showID: props.operatorType === operateTypes.ADD,
      canEdit: props.operatorType !== operateTypes.VIEW,
      currentSocialType: '',
      [SOCIAL_MEDIA.QQ]: '',
      [SOCIAL_MEDIA.WECHAT]: '',
    };
  }
  componentDidMount() {
    this.initState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      showID: nextProps.operatorType === operateTypes.ADD,
      canEdit: nextProps.operatorType !== operateTypes.VIEW,

    });
    if (nextProps.editObject !== this.props.editObject) {
      this.initState(nextProps);
    }
  }
  initState(props) {
    const { editObject } = props;
    const { socials } = editObject;
    const mapSocials = {};
    if (_.isEmpty(socials)) {
      this.setState({
        currentSocialType: SOCIAL_MEDIA.WECHAT,
        [SOCIAL_MEDIA.QQ]: '',
        [SOCIAL_MEDIA.WECHAT]: '',
      });
      return;
    }
    socials.forEach((s) => {
      mapSocials[s.social_media_type] = s.social_media_number;
    });
    this.setState({
      currentSocialType: _.isEmpty(mapSocials[SOCIAL_MEDIA.QQ]) ? SOCIAL_MEDIA.WECHAT : SOCIAL_MEDIA.QQ,
      [SOCIAL_MEDIA.QQ]: mapSocials[SOCIAL_MEDIA.QQ] || '',
      [SOCIAL_MEDIA.WECHAT]: mapSocials[SOCIAL_MEDIA.WECHAT] || '',
    });
  }
  changeSocial = (type, number) => {
    this.setState({
      [type]: number,
    });
  }
  socialTypeChange = (type) => {
    this.setState({
      currentSocialType: type,
    });
  }
  socialNumberChange = (number) => {
    this.setState({
      [this.state.currentSocialType]: number,
    });
  }
  handleValidate = () => {
    const self = this;
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        self.handleSubmit(values);
      }
    });
  }
  mapPostData = (oldValue) => {
    const value = Object.assign({}, oldValue);
    const result = {
      id: value.id,
      first_name: value.firstName,
      last_name: value.lastName,
      phone: value.phone,
      email: value.email,
      street: value.address,
      sub_category_id: value.interests,
      sub_group_id: value.group,
      city: value.city,
      state: value.state,
      country: value.country,
      zip_code: value.zipCode,
      id_number: value.idNumber,
      file: {
        front_id_doc: _.isArray(value.idFront) ? value.idFront[0] : value.idFront,
        back_id_doc: _.isArray(value.idBack) ? value.idBack[0] : value.idBack,
      },
    };
    const social_media = [];
    if (!_.isEmpty(this.state[SOCIAL_MEDIA.QQ])) {
      social_media.push({
        social_media_type: SOCIAL_MEDIA.QQ,
        social_media_number: this.state[SOCIAL_MEDIA.QQ],
      });
    }
    if (!_.isEmpty(this.state[SOCIAL_MEDIA.WECHAT])) {
      social_media.push({
        social_media_type: SOCIAL_MEDIA.WECHAT,
        social_media_number: this.state[SOCIAL_MEDIA.WECHAT],
      });
    }
    return Object.assign({}, result, { social_media });
  }
  mapPropsToFields = (props) => {
    if (_.isEmpty(props)) return {};
    const value = Object.assign({}, props);
    const result = {
      id: value.id,
      firstName: value.first_name,
      lastName: value.last_name,
      phone: value.phone,
      email: value.email,
      address: value.street,
      group: value.sub_group_id,
      interests: value.sub_category_id,
      city: value.city,
      state: value.state,
      country: value.country,
      zipCode: value.zip_code,
      idNumber: value.id_number,
    };

    const mapPath = {};
    props.document.forEach((r) => {
      mapPath[r.name] = r.path;
    });
    return Object.assign({}, result, {
      idFront: mapPath.front_id_doc || '',
      idBack: mapPath.back_id_doc || '',
    });
  }
  handleSubmit = (value) => {
    const postform = this.mapPostData(value);
    const callback = this.props.onClose.bind(this);
    if (this.props.operatorType === operateTypes.ADD) {
      this.props.add(postform, callback);
    } else if (this.props.operatorType === operateTypes.EDIT) {
      this.props.update(postform, callback);
    }
  }
  handleCancel = (e) => {
    this.props.onClose();
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      editObject, visible, language, userType, operatorType, group, interests, countries,
    } = this.props;
    const dialogTitle = ((_userType, _operatorType) => {
      const type = `page.${_userType}`;
      if (_operatorType === operateTypes.EDIT) {
        return `${type}.editDiologTitle`;
      } else if (_operatorType === operateTypes.VIEW) {
        return `${type}.viewDialogTitle`;
      }

      return `${type}.addDialogTitle`;
    })(userType, operatorType);
    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title={formatMessage({ id: dialogTitle })}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>{ formatMessage({ id: 'global.ui.button.cancel' }) }</Button>,
          <Button disabled={!this.state.canEdit} key="submit" type="primary" onClick={() => { this.handleValidate(); }}>
            { formatMessage({ id: 'global.ui.button.submit' }) }
          </Button>,
        ]}
      >
        <div id="addAndEditDialog">
          <UserForm
            showID={this.state.showID}
            canEdit={this.state.canEdit}
            editObject={this.mapPropsToFields(editObject)}
            countries={countries}
            language={language}
            onSubmit={this.handleValidate}
            ref={(c) => { this.form = c; }}
            group={group}
            interests={interests}
            currentSocialType={this.state.currentSocialType}
            QQ={this.state[SOCIAL_MEDIA.QQ]}
            weChat={this.state[SOCIAL_MEDIA.WECHAT]}
            socialNumberChange={this.socialNumberChange}
            socialTypeChange={this.socialTypeChange}
          />
        </div>
      </Modal>
    );
  }
}

userDialog.defaultProps = {
  editObject: {},
  visible: false,
  add() {},
  update() {},
  operatorType: '',
  interests: [],
  group: [],
  countries: [],
};
userDialog.propTypes = {
  intl: intlShape.isRequired,
  editObject: PropTypes.object,
  language: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  add: PropTypes.func,
  update: PropTypes.func,
  operatorType: PropTypes.string,
  interests: PropTypes.array,
  group: PropTypes.array,
  countries: PropTypes.array,
  userType: PropTypes.string.isRequired, // Leads,Accounts
};
const UserDialog = injectIntl(userDialog);
export default UserDialog;
