import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

class historyOrderDialog extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    const columns = [{
      title: formatMessage({ id: 'global.properNouns.orderNo' }),
      dataIndex: 'orderNo',
      key: 'orderNo',
      // eslint-disable-next-line no-script-url
      render: text => <a href="javascript:void(0)">{text}</a>,
    }, {
      title: formatMessage({ id: 'global.properNouns.totalPrice' }),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    }, {
      title: formatMessage({ id: 'global.properNouns.orderDate' }),
      dataIndex: 'orderDate',
      key: 'orderDate',
    }, {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      render: (text, record) => (
        <span>
          <a download href={record.invoiceUrl} target="_blank">{
          formatMessage({ id: 'global.ui.button.view' }, {
            file: formatMessage({ id: 'global.properNouns.invoice' }),
          })
        }
          </a>
        </span>
      ),
    }];

    const data = [{
      orderNo: 122333,
      totalPrice: '$2333',
      key: 122333,
      orderDate: '2017-10-10',
      invoiceUrl: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
    }, {
      orderNo: 1223334,
      totalPrice: '$23334',
      key: 1223334,
      orderDate: '2017-10-10',
      invoiceUrl: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
    }, {
      orderNo: 1223335,
      totalPrice: '$2333',
      key: 1223335,
      orderDate: '2017-10-10',
      invoiceUrl: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
    }];
    return (
      <div>
        <div className="block">
          <div className="block-title">
            <strong>{ formatMessage({ id: 'page.Accounts.general' }) }</strong>
          </div>
          <div className="block-content">
            <dl>
              <dt>{ formatMessage({ id: 'page.Accounts.mostBoughtItem' }) }:</dt>
              <dd>Milk</dd>
              <dt>{ formatMessage({ id: 'page.Accounts.totalSpending' }) }:</dt>
              <dd>$5000.00</dd>
              <dt>{ formatMessage({ id: 'page.Accounts.totalProfit' }) }:</dt>
              <dd>$2200.10</dd>
            </dl>
          </div>
        </div>
        <div className="block">
          <div className="block-title">
            <strong>{ formatMessage({ id: 'page.Accounts.historyOrder' }) }</strong>
          </div>
          <div className="block-content">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    );
  }
}

historyOrderDialog.propTypes = {
  intl: intlShape.isRequired,
};
const HistoryOrderDialog = injectIntl(historyOrderDialog);
export default HistoryOrderDialog;
