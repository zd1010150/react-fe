import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../Leads.less';
import { Upload } from 'src/components/ui/index';

class id extends React.Component {
 state = { visible: this.props.visible }
 handleOk = (e) => {
   console.log(e);
   this.setState({
     visible: false,
   });
 }
 handleCancel = (e) => {
   console.log(e);
   this.setState({
     visible: false,
   });
 }
 render() {
   const { formatMessage } = this.props.intl;

   return (
     <Modal
       title="Basic Modal"
       visible={this.state.visible}
       onOk={this.handleOk}
       onCancel={this.handleCancel}
     >
       <div className="row">
         <div className="col-md-6 col-sm-6">
           <Upload pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })} file={this.props.idFront} />
         </div>
         <div className="col-md-6 col-sm-6">
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
  idBack: ''
}
id.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool,
  userId: PropTypes.string,
  idFront: PropTypes.string,
  idBack: PropTypes.string,
};
const ID = injectIntl(id);
export default ID;
