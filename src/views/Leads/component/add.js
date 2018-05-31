import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { LeadsAndAccountsEditAddDialog } from 'components/page';

import operateType from 'components/page/LeadsAndAccountsEditAddDialog/flow/operateType';

class add extends React.Component {
  state = { dialogVisible: false };
  showModal = () => {
    this.setState({
      dialogVisible: true,
    });
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
        <Button type="primary" onClick={this.showModal}><Icon type="plus" />{ formatMessage({ id: 'global.ui.button.addBtn' }) }</Button>
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
};

const Add = injectIntl(add);
export default Add;
