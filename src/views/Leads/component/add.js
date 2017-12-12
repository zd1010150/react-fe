import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
// import classNames from 'classnames/bind';
import UserDialog from './userDialog';
// import styles from '../Leads.less';


class add extends React.Component {
  state = { dialogVisible : false }
  showModal = () => {
    this.setState({
      dialogVisible: true,
    });
  }
  closeDialog = () =>{
    this.setState({
      dialogVisible : false
    })
  }
  render() {
    // const cx = classNames.bind(styles);
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>{ formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'global.properNouns.leads' }) })}</Button>
        <UserDialog language={this.props.language} visible={this.state.visible} onCloseDialog={this.closeDialog}/>
      </div>
    );
  }
}
add.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
};

const Add = injectIntl(add);
export default Add;
