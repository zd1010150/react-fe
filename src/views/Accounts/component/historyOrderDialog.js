import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import HistoryOrders from './historyOrders';

const historyOrderDialog = ({
  intl, onClose, visible,
}) => {
  const { formatMessage } = intl;
  const handleOK = () => {
    onClose();
  };
  const handleCancel = () => {
    onClose();
  }
  return (
    <Modal
      title={formatMessage({ id: 'page.Accounts.historyOrderDialogTitle' })}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={() => { handleOK(); }}>
          { formatMessage({ id: 'global.ui.button.ok' }) }
        </Button>,
      ]}
    >
      <HistoryOrders />
    </Modal>
  );
};
historyOrderDialog.propTypes = {
  intl: intlShape.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
const HistoryOrderDialog = injectIntl(historyOrderDialog);
export default HistoryOrderDialog;
