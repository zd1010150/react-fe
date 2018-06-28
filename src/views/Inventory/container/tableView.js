
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Input, Icon, Popover, Tooltip, notification } from 'antd';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { CHINESE_CODE } from 'config/app.config';
import { Currency } from 'components/ui/index';
import { MagentoProductImgPrefix } from 'config/magento.config';
import { queryByPaging, queryBySearchKey, setSearchKey, buy } from '../flow/action';
import { addCartCount } from 'components/page/HeaderContent/flow/action';
import styles from '../index.less';

const cx = classNames.bind(styles);
const { Search } = Input;
class TableView extends React.Component {
  componentDidMount() {
    this.props.queryByPaging();
  }
  buy = (record) => {
    const { buy, addCartCount, intl } = this.props;
    const { formatMessage } = intl;
    buy(record.product.sku, 1, (productName) => {
      addCartCount();
      notification.success({
        message: formatMessage({ id: 'page.Inventory.buySuccessTip' }, { name: productName }),
      });
    });
  }
  search = (value) => {
    const { queryBySearchKey, setSearchKey } = this.props;
    queryBySearchKey(value);
    setSearchKey(value);
  }
  render() {
    const { inventoryData, queryByPaging, inventoryDataTablePagination } = this.props;
    const pagination = {
      defaultCurrent: inventoryDataTablePagination.currentPage,
      current: inventoryDataTablePagination.currentPage,
      defaultPageSize: inventoryDataTablePagination.perPage,
      pageSize: inventoryDataTablePagination.perPage,
      total: inventoryDataTablePagination.total,
      onChange(page, pageSize) {
        queryByPaging(pageSize, page);
      },
    };
    const { formatMessage, locale } = this.props.intl;
    const columns = [{
      title: formatMessage({ id: 'page.Inventory.productName' }),
      key: 'name',
      width: 150,
      render: (text, record) => (<div>
        <Tooltip title={locale === CHINESE_CODE ? record.product.name : record.product.name_en} overlayClassName="name-tooltip">
          <p className={cx('product-name')}>
            {locale === CHINESE_CODE ? record.product.name : record.product.name_en }
          </p>
        </Tooltip>
        <Tooltip placement="bottom" title={record.product.sku} overlayClassName="name-tooltip">
          <p className={cx('product-sku')}> {record.product.sku}</p>
        </Tooltip>
      </div>),
    }, {
      title: formatMessage({ id: 'page.Inventory.productPic' }),
      key: 'pic',
      width: 150,
      render: (text, record) => (
        <Popover placement="right" content={<img className={cx('product-img-popover')} src={`${MagentoProductImgPrefix}${record.product.image_url}`} alt={record.product.name} />}>
          <img className={cx('product-img')} src={`${MagentoProductImgPrefix}${record.product.image_url}`} alt={record.product.name} />
        </Popover>),
    }, {
      title: formatMessage({ id: 'page.Inventory.lastStocking' }),
      key: 'lastStocking',
      width: 150,
      dataIndex: 'last_stocking_date',
    }, {
      title: formatMessage({ id: 'page.Inventory.currentInventory' }),
      dataIndex: 'current_quantity',
      key: 'current_quantity',
      width: 150,
    }, {
      title: formatMessage({ id: 'page.Inventory.soldDate' }),
      dataIndex: 'last_sold_date',
      key: 'soldDate',
      width: 150,
    }, {
      title: formatMessage({ id: 'page.Inventory.soldItems' }),
      dataIndex: 'sold_items',
      key: 'soldItems',
      width: 150,
    }, {
      title: formatMessage({ id: 'page.Inventory.unitCost' }),
      key: 'unitCost',
      width: 150,
      render: (text, record) => <Currency value={record.unit_cost} />,
    }, {
      title: formatMessage({ id: 'page.Inventory.currentCost' }),
      key: 'currentCost',
      width: 150,
      render: (text, record) => <Currency value={record.total_value} />,
    }, {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      width: 100,
      render: (text, record) => (<Button onClick={() => { this.buy(record); }} size="small" type="primary">
        {formatMessage({ id: 'page.Inventory.restock' })}
                                 </Button>),
    }];
    return (
      <section>
        <div className={cx('search-section')}>
          <Search
            placeholder={formatMessage({ id: 'page.Inventory.searchPlaceHolder' })}
            onSearch={value => this.search(value)}
            enterButton
            className={cx('search-input')}
          />
        </div>
        <Table
          className="inventory-table"
          columns={columns}
          dataSource={inventoryData}
          pagination={pagination}
          rowClassName={(record) => {
            const enable = Number(record.current_quantity) > 0;
            if (!enable) {
              return 'error-row';
            }
          }}
        />
      </section>

    );
  }
}

TableView.propTypes = {
  intl: intlShape.isRequired,
  inventoryData: PropTypes.array.isRequired,
  queryByPaging: PropTypes.func.isRequired,
  queryBySearchKey: PropTypes.func.isRequired,
  setSearchKey: PropTypes.func.isRequired,
  buy: PropTypes.func.isRequired,
  addCartCount: PropTypes.func.isRequired,
  inventoryDataTablePagination: PropTypes.object.isRequired,
};
const mapStateToProps = ({ inventory }) => ({
  inventoryData: inventory.inventoryData,
  inventoryDataTablePagination: inventory.inventoryDataTablePagination,
});
const mapDispatchToProp = {
  queryByPaging,
  queryBySearchKey,
  setSearchKey,
  buy,
  addCartCount,
};

export default connect(mapStateToProps, mapDispatchToProp)(injectIntl(TableView));
