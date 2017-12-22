
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

const { TabPane } = Tabs;
class skeleton extends React.Component {
  submitOrder() {
    console.log('submit order');
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      steps, setOrderUser, user,
    } = this.props;
    return (
      <div>
        <Step currentStep={steps.currentStep} steps={steps.steps.map(item => ({ title: item }))} />
        <Tabs className="steps-content" defaultActiveKey="1" activeKey={steps.steps[steps.currentStep]} >
          <TabPane tab="" key="chooseUser"><ChooseUser user={user} setOrderUser={setOrderUser} /></TabPane>
          <TabPane tab="" key="chooseGoods"><ChooseGood /></TabPane>
          <TabPane tab="" key="splitOrder"><SplitOrder /></TabPane>
          <TabPane tab="" key="confirmOrder"><Confirm /></TabPane>
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

const mapStateToProps = ({ order }) => (
  { ...order.skeleton }
);


const Skeleton = connect(mapStateToProps)(injectIntl(skeleton));
export default Skeleton;
