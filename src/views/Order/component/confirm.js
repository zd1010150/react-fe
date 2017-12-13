import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

class confirm extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div> this is ChooseUser<Button onClick={() => { this.props.splitOrder(); }}>分包</Button></div>
    );
  }
}

confirm.defaultProps = {
  splitOrder() {},
};
confirm.propTypes = {
  intl: intlShape.isRequired,
  splitOrder: PropTypes.func,
};
const Confirm = injectIntl(confirm);
export default Confirm;
