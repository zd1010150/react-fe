import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import Step from './step';
import ChooseGood from './chooseGood';
import ChooseUser from './chooseUser';
import Confirm from './confirm';
import SplitOrder from './splitOrder';

class skeleton extends React.Component {
  state = {
    currentStep: 1,
    steps: [{
      title: 'chooseUser',
      content: <ChooseUser />,
    }, {
      title: 'chooseGoods',
      content: <ChooseGood />,
    }, {
      title: 'confirmOrder',
      content: (<Confirm splitOrder={() => { this.splitOrder(); }} />),
    }],
  }
  next() {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
  }
  prev() {
    const currentStep = this.state.currentStep - 1;
    this.setState({ currentStep });
  }
  splitOrder() {
    const newSteps = this.state.steps.slice();
    newSteps.splice(2, 0, {
      title: 'splitOrder',
      content: <SplitOrder />,
    });
    this.setState({
      steps: newSteps,
      currentStep: 2,
    });
  }
  submitOrder() {
    console.log('submit order');
  }
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        { this.props.userId }
        <Step currentStep={this.state.currentStep} steps={this.state.steps} />
        <div className="steps-action">
          {
            this.state.currentStep > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
          {
            this.state.currentStep
             < this.state.steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === this.state.steps.length - 1
            &&
            <Button type="primary" onClick={() => this.submitOrder()}>确认</Button>
          }
        </div>
        <div className="steps-content">{this.state.steps[this.state.currentStep].content}</div>

      </div>
    );
  }
}

skeleton.propTypes = {
  intl: intlShape.isRequired,
  userId: PropTypes.string.isRequired,
};
const Skeleton = injectIntl(skeleton);
export default Skeleton;
