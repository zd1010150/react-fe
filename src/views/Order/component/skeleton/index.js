
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs } from 'antd';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import Step from './step';
import ChooseGood from '../chooseGood/index';
import ChooseUser from '../chooseUser/index';
import Confirm from '../confirm';
import SplitOrder from '../splitOrder/index';
import { setCurrentStep, addSteps } from './flow/action';

const { TabPane } = Tabs;
class skeleton extends React.Component {
  submitOrder() {
    console.log('submit order');
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      currentStep, setCurrentStep, steps, setOrderUser, user, addSteps,
    } = this.props;
    return (
      <div>
        <Step currentStep={currentStep} steps={steps.map(item => ({ title: item }))} />
        <Tabs className="steps-content" defaultActiveKey="1" activeKey={steps[currentStep]} >
          <TabPane tab="" key="chooseUser"><ChooseUser user={user} setOrderUser={setOrderUser} /></TabPane>
          <TabPane tab="" key="chooseGoods"><ChooseGood /></TabPane>
          <TabPane tab="" key="splitOrder"><SplitOrder /></TabPane>
          <TabPane tab="" key="confirmOrder"><Confirm splitOrder={() => { addSteps(2, 'splitOrder'); setCurrentStep(2); }} /></TabPane>
        </Tabs>
      </div>
    );
  }
}

skeleton.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object.isRequired,
  setOrderUser: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  addSteps: PropTypes.func.isRequired,
};

const mapStateToProps = ({ order }) => (
  { ...order.skeleton }
);
const mapDispatchToProps = {
  setCurrentStep,
  addSteps,
};

const Skeleton = connect(mapStateToProps, mapDispatchToProps)(injectIntl(skeleton));
export default Skeleton;
