import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Icon, Radio } from 'antd';
import { Currency } from 'components/ui/index';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { getTotalLogisticFee } from './flow/action';
import { goNextStep, goPreviousStep } from '../skeleton/flow/action';
import styles from '../../Order.less';
import { confirmGetInvoice } from '../confirmInvoice/flow/action';

const RadioGroup = Radio.Group;
const cx = classNames.bind(styles);
class chooseLogisticView extends React.Component {
  state = {
    logisticType: this.props.freightSetting[0].id || 0,
  }
  componentDidMount() {
    if (this.state.logisticType > 0) {
      this.getTotalFee(this.state.logisticType, this.props.deliveryOrderIds);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.freightSetting && nextProps.freightSetting.length > 0 && nextProps.deliveryOrderIds !== this.props.deliveryOrderIds) {
      this.getTotalFee(nextProps.freightSetting[0].id, nextProps.deliveryOrderIds);
    }
  }
  getTotalFee(logisticId, orderids) {
    this.setState({
      logisticType: logisticId,
    });
    this.props.getTotalLogisticFee(logisticId, orderids);
  }
  render() {
    const {
      goNextStep,
      goPreviousStep,
      freightSetting,
      confirmGetInvoice,
      totalFee,
      deliveryOrderIds,
      intl,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div className={classNames('block', cx('choose-logistic-block'))}>
        <div className="block-title">
          <strong> { formatMessage({ id: 'global.properNouns.logistics' })} </strong>
        </div>
        <div className="block-content">
          <RadioGroup
            onChange={e => this.getTotalFee(e.target.value, deliveryOrderIds)}
            value={this.state.logisticType}
          >
            {
              freightSetting.map(f => (
                <Radio value={f.id} key={f.id}>
                  <div>{f.name}</div>
                  <div>{`${f.cost}/kg`}</div>
                </Radio>
                ))
            }
          </RadioGroup>
          <p>{ formatMessage({ id: 'global.properNouns.goods.shippingCost' })}：<Currency value={totalFee} /></p>
        </div>
        <div className="block-footer">
          <Button
            className={cx('order-step-previous-btn')}
            disabled
            onClick={() => {
            goPreviousStep('chooseLogistic');
          }}
          >
            <Icon type="arrow-left" /> { formatMessage({ id: 'global.ui.button.previous' }) }
          </Button>
          <Button
            className={cx('order-step-next-btn')}
            type="primary"
            onClick={() => {
              if(this.props.needCreateInvoice){
                confirmGetInvoice();
              }
              goNextStep('chooseLogistic');
          }}
          >
            { formatMessage({ id: 'global.ui.button.next' }) } <Icon type="arrow-right" />
          </Button>
        </div>
      </div>
    );
  }
}
chooseLogisticView.defaultProps = {
  freightSetting: [{
    id: 0,
  }],
  deliveryOrderIds: [],
};
chooseLogisticView.propTypes = {
  intl: intlShape.isRequired,
  freightSetting: PropTypes.array,
  deliveryOrderIds: PropTypes.array,
  goNextStep: PropTypes.func.isRequired,
  goPreviousStep: PropTypes.func.isRequired,
  getTotalLogisticFee: PropTypes.func.isRequired,
  confirmGetInvoice: PropTypes.func.isRequired,
  needCreateInvoice: PropTypes.bool.isRequired,
};
const mapStateToProps = ({ global, order }) => ({
  freightSetting: global.settings.freightSetting,
  deliveryOrderIds: order.skeleton.deliveryOrders,
  totalFee: order.chooseLogistic.logistic.fee,
  needCreateInvoice: order.chooseLogistic.needCreateInvoice,
});
const mapDispathToProps = {
  goNextStep,
  goPreviousStep,
  getTotalLogisticFee,
  confirmGetInvoice,
};

const ChooseLogisticView = connect(mapStateToProps, mapDispathToProps)(injectIntl(chooseLogisticView));
export default ChooseLogisticView;
