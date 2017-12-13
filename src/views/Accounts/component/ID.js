import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
// import classNames from 'classnames/bind';
// import styles from '../Leads.less';
import { Upload } from 'src/components/ui/index';

// const cx = classNames.bind(styles);

class id extends React.Component {
 state = { visible: this.props.visible }
 handleOk = (e) => {
   console.log(e);
   this.props.onClose();
 }
 handleCancel = (e) => {
   console.log(e);
   this.props.onClose();
 }
 render() {
   const { formatMessage } = this.props.intl;


   return (
     <Modal
       title={formatMessage({ id: 'page.Leads.editId' })}
       visible={this.props.visible}
       onOk={this.handleOk}
       onCancel={this.handleCancel}
     >
       <div className="row">
         <div className="col-md-6 col-sm-6" style={{ textAlign: 'center' }}>
           <Upload pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })} file={this.props.idFront} />
         </div>
         <div className="col-md-6 col-sm-6" style={{ textAlign: 'center' }}>
           <Upload pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDBack' })} file={this.props.idBack} />
         </div>
       </div>
     </Modal>
   );
 }
}
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
  onClose: PropTypes.func.isRequired,
};
const ID = injectIntl(id);
export default ID;
