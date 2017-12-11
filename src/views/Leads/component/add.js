import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
// import classNames from 'classnames/bind';

import AddForm from './addForm';
// import styles from '../Leads.less';


class add extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleValidate = () => {
    const self = this;
    this.form.validateFieldsAndScroll((err, values) => {
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
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    // const cx = classNames.bind(styles);
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>{ formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'global.properNouns.leads' }) })}</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>{ formatMessage({ id: 'global.ui.button.cancel' }) }</Button>,
            <Button key="submit" type="primary" onClick={() => { this.handleValidate(); }}>
              { formatMessage({ id: 'global.ui.button.submit' }) }
            </Button>,
        ]}
        >
          <AddForm onSubmit={this.handleSubmit} ref={(c) => { this.form = c; }} />
        </Modal>
      </div>
    );
  }
}
add.propTypes = {
  intl: intlShape.isRequired
};
const Add = injectIntl(add);
export default Add;