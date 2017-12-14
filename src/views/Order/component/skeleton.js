
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import Step from './step';
import ChooseGood from './chooseGood';
import ChooseUser from './chooseUser';
import Confirm from './confirm';
import SplitOrder from './splitOrder';


const { TabPane } = Tabs;
class skeleton extends React.Component {
  state = {
    currentStep: 0,
    steps: [{
      title: 'chooseUser',
    }, {
      title: 'chooseGoods',
    }, {
      title: 'confirmOrder',
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
        <Tabs className="steps-content" defaultActiveKey="1" activeKey={this.state.steps[this.state.currentStep].title} >
          <TabPane tab="" key="chooseUser"><ChooseUser user={this.props.user} setOrderUser={this.props.setOrderUser} userId={this.props.userId} /></TabPane>
          <TabPane tab="" key="chooseGoods"><ChooseGood /></TabPane>
          <TabPane tab="" key="splitOrder"><SplitOrder /></TabPane>
          <TabPane tab="" key="confirmOrder"><Confirm splitOrder={() => { this.splitOrder(); }} /></TabPane>
        </Tabs>
      </div>
    );
  }
}

skeleton.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object.isRequired,
  setOrderUser: PropTypes.func.isRequired,
};
const Skeleton = injectIntl(skeleton);
export default Skeleton;
