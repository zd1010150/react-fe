import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
// import classNames from 'classnames/bind';
import operateType from '../flow/operateType';
import UserForm from './form';
import _ from 'lodash';
import { baseUrl } from 'src/config/env.config';

class userDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canEdit: props.operations !== 'view',
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      cenEdit: nextProps.operations !== 'view',
    });
  }
  handleValidate = () => {
    const self = this;
    this.form.instance.validateFieldsAndScroll((err, values) => {
      console.log('Received err of form: ', err);
      if (!err) {
        console.log('Received values of form: ', values);
        self.setState({
          visible: false,
        });
        self.handleSubmit(values);
      }
    });
  }
  mapPostData = (oldValue) => {
    const value = Object.assign({}, oldValue);
    const result = {
      first_name: value.firstName,
      last_name: value.lastName,
      phone: value.phone,
      address: value.address,
      sub_group_id: value.group,
      sub_category_id: value.interests,
      city: value.city,
      state: value.state,
      country: value.country,
      zip_code: value.zipCode,
      file: {
        front_id_doc: value.idFront[0],
        back_id_doc: value.idBack[0],
      },
    };
    if (_.trim(value.socialMediaNumber).length > 0 && value.socialMediaType.length > 0) {
      result.social_media = [{
        social_media_type: value.socialMediaType,
        social_media_number: value.socialMediaNumber,
      }];
    }
    return result;
  }
  mapPropsToFields = (props) => {
    if (_.isEmpty(props)) return {};
    const value = Object.assign({}, props);
    const result = {
      id: value.id,
      firstName: value.first_name,
      lastName: value.last_name,
      phone: value.phone,
      address: value.address,
      group: value.sub_group_id,
      interests: value.sub_category_id,
      city: value.city,
      state: value.state,
      country: value.country,
      zipCode: value.zip_code,
    };
    if (props.socials && props.socials.length > 0) {
      const social = props.socials[0];
      result.socialMediaType = social.social_media_type;
      result.socialMediaNumber = social.social_media_number;
    }
    if (props.document && props.document.length > 0) {
      result.idFront = baseUrl +"/"+ props.document[0].path;
      if (props.document && props.document.length > 1) {
        result.idBack = baseUrl +"/"+ props.document[1].path;
      }
    }
    return result;
  }
  handleSubmit = (value) => {
    const postform = this.mapPostData(value);
    if (this.props.operatorType === operateType.ADD) {
      this.props.add(postform);
    } else if (this.props.operatorType === operateType.EDIT) {
      this.props.update(postform);
    }
    this.props.onClose();
  }
  handleCancel = (e) => {
    this.props.onClose();
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      editObject, visible, language, userType, operatorType, group, interests,
    } = this.props;
    const dialogTitle = ((_userType, _operatorType) => {
      const type = `page.${_userType}`;
      if (_operatorType === operateType.EDIT) {
        return `${type}.editDiologTitle`;
      } else if (_operatorType === operatorType.VIEW) {
        return `${type}.viewDialogTitle`;
      }

      return `${type}.addDialogTitle`;
    })(userType, operatorType);

    return (
      <Modal
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
        <UserForm canEdit={this.state.canEdit} editObject={this.mapPropsToFields(editObject)} language={language} onSubmit={this.handleValidate} ref={(c) => { this.form = c; }} group={group} interests={interests} />
      </Modal>
    );
  }
}

userDialog.defaultProps = {
  editObject: {},
  visible: false,
  add() {},
  update() {},
  operatorType: 'view',
  interests: [],
  group: [],
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
  userType: PropTypes.string.isRequired, // Leads,Accounts
};
const UserDialog = injectIntl(userDialog);
export default UserDialog;
