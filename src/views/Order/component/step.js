/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

const { Step } = Steps;
class orderStep extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Steps current={this.props.currentStep}>
        {
          this.props.steps.map((item, index) =>
            <Step key={index} title={formatMessage({ id: `page.Order.${item.title}` })} />)
        }
      </Steps>
    );
  }
}
orderStep.defaultProps = {
  currentStep: 1,
};
orderStep.propTypes = {
  currentStep: PropTypes.number,
  steps: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
};
const OrderStep = injectIntl(orderStep);
export default OrderStep;
