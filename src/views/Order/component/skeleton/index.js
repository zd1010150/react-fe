
import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import Step from './step';
import ChooseGood from '../chooseGood/index';
import ChooseUser from '../chooseUser/index';
import ConfirmInvoice from '../confirmInvoice';
import SplitOrder from '../splitOrder/index';
import ChooseLogistic from '../chooseLogistic/index';

const { TabPane } = Tabs;
class skeleton extends React.Component {
  render() {
    const {
      steps,
    } = this.props;
    return (
      <div>
        <Step currentStep={steps.currentStep} steps={steps.steps.map(item => ({ title: item }))} />
        <Tabs className="steps-content" defaultActiveKey="1" activeKey={steps.steps[steps.currentStep]} animated={false}>
          <TabPane tab="" key="chooseUser"><ChooseUser /></TabPane>
          <TabPane tab="" key="chooseGoods"><ChooseGood /></TabPane>
          <TabPane tab="" key="splitOrder"><SplitOrder /></TabPane>
          <TabPane tab="" key="chooseLogistic"><ChooseLogistic /></TabPane>
          <TabPane tab="" key="confirmOrder"><ConfirmInvoice /></TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({ order }) => (
  { ...order.skeleton }
);


const Skeleton = connect(mapStateToProps)(skeleton);
export default Skeleton;
