import React from 'react';
import PropTypes from 'prop-types';
import { CURRENCY_SYMBOL } from 'config/app.config';
import { connect } from 'react-redux';
import { Button, Icon, Radio, Input, Layout, Tooltip } from 'antd';
import { Currency } from 'components/ui/index';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { getTotalLogisticFee, batchDelete, setInvoiceCost } from './flow/action';
import { goNextStep, goPreviousStep } from '../skeleton/flow/action';
import styles from '../../Order.less';
import { confirmGetInvoice } from '../confirmInvoice/flow/action';
import { getAvailableFreightSettings } from './flow/reselect';


const RadioGroup = Radio.Group;
const cx = classNames.bind(styles);
const { Sider, Content } = Layout;

class chooseLogisticView extends React.Component {
  state = {
    logisticType: this.props.freightSetting.length > 0 ? this.props.freightSetting[0].id : 0,
    logisticPrice: this.props.freightSetting.length > 0 ? this.props.freightSetting[0].cost : 0,
    isEditing: false,
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
  setEditingPrice(val) {
    this.props.setInvoiceCost(val);
  }
  setEditingPriceStatus(isEditing) {
    this.setState({
      isEditing,
    });
  }
  getTotalFee(logisticId, orderids) {
    const logistic = this.props.freightSetting.filter(f => f.id === logisticId);
    this.setState({
      logisticType: logisticId,
      logisticPrice: logistic.length > 0 ? logistic[0].cost : 0,
    });
    this.props.getTotalLogisticFee(logisticId, orderids);
  }
  reOrder() {
    const {
      goPreviousStep, batchDelete, deliveryOrderIds,
    } = this.props;
    batchDelete(deliveryOrderIds);
    goPreviousStep('chooseLogistic');
  }
  render() {
    const {
      totalInvoiceFee,
      goNextStep,
      freightSetting,
      confirmGetInvoice,
      needCreateInvoice,
      totalFee,
      totalWeight,
      deliveryOrderIds,
      intl,
      baseCurrency,
      orderUser,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div>
        <Layout className={cx('choose-logistic-wrapper')}>
          <Content className={cx('choose-logistic-left-wrapper')}>
            <div className={classNames('block', cx('choose-logistic-left'))}>
              <div className="block-title">
                <strong> {formatMessage({ id: 'page.Order.chooseLogistic' })}</strong>
              </div>
              <div className="block-content pb-lg">
                <RadioGroup
                  onChange={e => this.getTotalFee(e.target.value, deliveryOrderIds)}
                  value={this.state.logisticType}
                >
                  {
                    freightSetting.map(f => (
                      <Radio value={f.id} key={f.id}>
                        <div className={cx('choose-logistic-logistic-name-price')}>
                          <span className={cx('choose-logistic-logistic-name')}>{f.name}</span>
                          <span className={cx('choose-logistic-logistic-price')}><Currency value={f.cost} /> /{formatMessage({ id: 'page.Order.kg' })}</span>
                        </div>
                        <div className={cx('choose-logistic-logistic-detail')}>{formatMessage({ id: 'page.Order.freightSpec' }, { ...f, currency: CURRENCY_SYMBOL[baseCurrency[0].name] }) }</div>
                      </Radio>
                    ))
                  }
                </RadioGroup>
              </div>
            </div>
          </Content>
          <Sider
            trigger={null}
            collapsible
            collapsed={false}
            collapsedWidth={0}
            className={cx('choose-logistic-right-wrapper')}
            width={380}
          >
            <div className={classNames('block', cx('choose-logistic-right'))}>
              <div className="block-title">
                <strong> { formatMessage({ id: 'global.properNouns.logistics' })}</strong>
              </div>
              <div className="block-content">
                <ul className={cx('choose-good-cart-list')}>
                  <li className={classNames(cx('choose-good-cart-product'), cx('choose-logistic-product'))}>
                    <div className={classNames('row', cx('product-row'))}>
                      <div className="col-sm-4"><span className={cx('product-label')}>{formatMessage({ id: 'page.Order.logisticPrice' })}：</span></div>
                      <div className="col-sm-8"><Currency value={this.state.logisticPrice} /> /{formatMessage({ id: 'page.Order.kg' })}</div>
                    </div>
                    <div className={classNames('row', cx('product-row'))}>
                      <div className="col-sm-4"><span className={cx('product-label')}>{ formatMessage({ id: 'global.properNouns.goods.shippingWeight' })}:</span></div>
                      <div className="col-sm-8">{ totalWeight }</div>
                    </div>
                    <div className={classNames('row', cx('product-row'))}>
                      <div className="col-sm-4"><span className={cx('product-label')}>{ formatMessage({ id: 'global.properNouns.goods.shippingCost' })}：</span></div>
                      <div className="col-sm-8"><Currency value={totalFee} /></div>
                    </div>
                    <div className={classNames('row', cx('product-row'))}>
                      <div className={classNames('col-sm-4')}>
                        <span className={cx('product-label', cx('product-price'))}>
                          { formatMessage({ id: 'page.Order.invoiceShippingCost' })}
                          <Tooltip title="prompt text">
                            <Icon type="question-circle-o" className="pl-sm" />
                          </Tooltip>
                              :
                        </span>
                      </div>
                      <div className={classNames(cx('logistic-invoice-fee-wrapper'), 'col-sm-8')}>
                        <Input
                          className={classNames(cx('logistic-invoice-fee-input'), 'input-number', '')}
                          value={totalInvoiceFee}
                          disabled={!this.state.isEditing}
                          onInput={
                                (e) => {
                                  this.setEditingPrice(e.target.value);
                                }
                              }
                        />
                        { (!this.state.isEditing) ?
                              (
                                <Button
                                  className={classNames('icon-btn', 'ordinary')}
                                  onClick={() => this.setEditingPriceStatus(true)}
                                >
                                  <Icon type="edit" />
                                </Button>)
                              :
                              (
                                <Button
                                  className={classNames('icon-btn')}
                                  onClick={() => this.setEditingPriceStatus(false)}
                                >
                                  <Icon type="save" />
                                </Button>
                              )
                            }
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Sider>
        </Layout>
        <div className="block-footer">
          <Button
            className={cx('order-step-previous-btn')}
            disabled={!needCreateInvoice}
            onClick={() => {
            this.reOrder();
          }}
          >
            <Icon type="arrow-left" /> { formatMessage({ id: 'global.ui.button.previous' }) }
          </Button>
          <Button
            className={cx('order-step-next-btn')}
            type="primary"
            disabled={this.state.isEditing}
            onClick={() => {
              confirmGetInvoice();
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
  batchDelete: PropTypes.func.isRequired,
  goNextStep: PropTypes.func.isRequired,
  goPreviousStep: PropTypes.func.isRequired,
  getTotalLogisticFee: PropTypes.func.isRequired,
  confirmGetInvoice: PropTypes.func.isRequired,
  needCreateInvoice: PropTypes.bool.isRequired,
  setInvoiceCost: PropTypes.func.isRequired,
};
const mapStateToProps = ({ global, order }) => ({
  freightSetting: getAvailableFreightSettings({ global }),
  deliveryOrderIds: order.skeleton.deliveryOrders,
  totalFee: order.chooseLogistic.logistic.fee,
  totalInvoiceFee: order.chooseLogistic.logistic.invoiceFee,
  totalWeight: order.chooseLogistic.logistic.weight,
  needCreateInvoice: order.chooseLogistic.needCreateInvoice,
  baseCurrency: global.settings.baseCurrency,
  orderUser: global.orderUser,
});
const mapDispathToProps = {
  goNextStep,
  goPreviousStep,
  getTotalLogisticFee,
  confirmGetInvoice,
  batchDelete,
  setInvoiceCost,
};

const ChooseLogisticView = connect(mapStateToProps, mapDispathToProps)(injectIntl(chooseLogisticView));
export default ChooseLogisticView;
