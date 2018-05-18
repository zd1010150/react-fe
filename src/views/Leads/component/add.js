import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { LeadsAndAccountsEditAddDialog } from 'components/page';

import operateType from 'components/page/LeadsAndAccountsEditAddDialog/flow/operateType';

class add extends React.Component {
  state = { dialogVisible: false };
  showModal = () => {
    this.setState({
      dialogVisible: true,
    });
    this.props.setEditProvince('', this.props.provinces);
  }
  closeDialog = () => {
    this.setState({
      dialogVisible: false,
    });
  }
  render() {
    // const cx = classNames.bind(styles);
    const { formatMessage } = this.props.intl;
    const { addLeads } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>{ formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'global.properNouns.leads' }) })}</Button>
        <LeadsAndAccountsEditAddDialog visible={this.state.dialogVisible} onClose={() => { this.closeDialog(); }} add={addLeads} userType="Leads" operatorType={operateType.ADD} />
      </div>
    );
  }
}
add.defaultProps = {
  addLeads() {},
};
add.propTypes = {
  intl: intlShape.isRequired,
  addLeads: PropTypes.func,
  setEditProvince: PropTypes.func.isRequired,
  provinces: PropTypes.array.isRequired,
};

const Add = injectIntl(add);
export default Add;
