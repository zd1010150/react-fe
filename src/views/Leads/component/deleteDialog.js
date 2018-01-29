import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

const deleteDialog = ({ intl, onClose, visible, userId, onDelete }) => {
  const { formatMessage } = intl;
  const handleCancel = () => {
    onClose();
  };
  const handleOK = () => {
    onDelete(userId);
    onClose();
  };
  return (
    <Modal
      title={formatMessage({ id: 'page.Leads.deleteDialogTitle' })}
      visible={visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      footer={[
        <Button key="back" onClick={() => { handleCancel(); }}>{ formatMessage({ id: 'global.ui.button.cancel' }) }</Button>,
        <Button key="submit" type="primary" onClick={() => { handleOK(); }}>
          { formatMessage({ id: 'global.ui.button.ok' }) }
        </Button>,
    ]}
    >
      <span> {formatMessage({ id: 'page.Leads.deleteUserInfo' })} </span>
    </Modal>
  );
};
deleteDialog.propTypes = {
  intl: intlShape.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};
const DeleteDialog = injectIntl(deleteDialog);
export default DeleteDialog;
