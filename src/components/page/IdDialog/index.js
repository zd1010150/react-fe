import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { Upload } from 'src/components/ui/index';


const id = ({
  intl, visible, userId, idFront, idBack, onOk, onCancel,
}) => {
  const { formatMessage } = intl;
  return (
    <Modal
      title={formatMessage({ id: 'page.Leads.editId' })}
      visible={visible}
      onOk={() => onOk(userId, idFront, idBack)}
      onCancel={() => onCancel()}
    >
      <div className="row">
        <div className="col-md-6 col-sm-6" style={{ textAlign: 'center' }}>
          <Upload pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })} file={idFront} />
        </div>
        <div className="col-md-6 col-sm-6" style={{ textAlign: 'center' }}>
          <Upload pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDBack' })} file={idBack} />
        </div>
      </div>
    </Modal>
  );
};

id.defaultProps = {
  visible: false,
  userId: '',
  idFront: '',
  idBack: '',
};
id.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool,
  userId: PropTypes.string,
  idFront: PropTypes.string,
  idBack: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
const ID = injectIntl(id);
export default ID;
