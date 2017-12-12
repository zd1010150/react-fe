import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
// import classNames from 'classnames/bind';
import UserForm from './userForm';

class userDialog extends React.Component {
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
  handleSubmit = (value) => {
    console.log('submit data', value);
    this.props.onCloseDialog();
  }
  handleCancel = (e) => {
    console.log(e);
    this.props.onCloseDialog();
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { editLead, visible, language, cantEdit } = this.props;
    return (
      <Modal
        title={ JSON.stringify(editLead) === "{}" ? formatMessage({ id: 'page.Leads.addLeadsDialogTitle' }) : ( cantEdit ? formatMessage({ id: 'page.Leads.editLeadsDiologTitle' }) : formatMessage({ id: 'page.Leads.leadsDialogDetailTitle'}))}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>{ formatMessage({ id: 'global.ui.button.cancel' }) }</Button>,
          <Button disabled={!cantEdit} key="submit" type="primary" onClick={() => { this.handleValidate(); }}>
            { formatMessage({ id: 'global.ui.button.submit' }) }
          </Button>,
        ]}
      >
        <UserForm cantEdit={cantEdit} editLead={editLead} language={language} onSubmit={this.handleSubmit} ref={(c) => { this.form = c; }} />
      </Modal>
    );
  }
}

userDialog.defaultProps = {
  editLead: {},
  visible: false,
  cantEdit: false,
};
userDialog.propTypes = {
  intl: intlShape.isRequired,
  editLead: PropTypes.object,
  language: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onCloseDialog: PropTypes.func.isRequired,
  cantEdit: PropTypes.bool,
};
const UserDialog = injectIntl(userDialog);
export default UserDialog;
