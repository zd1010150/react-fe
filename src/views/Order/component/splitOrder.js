import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';

class splitOrder extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div> this is splitOrder</div>
    );
  }
}


splitOrder.propTypes = {
  intl: intlShape.isRequired,
};
const SplitOrder = injectIntl(splitOrder);
export default SplitOrder;
