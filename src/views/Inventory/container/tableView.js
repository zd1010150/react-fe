
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Input, Icon, Popover } from 'antd';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { CHINESE_CODE } from 'config/app.config';
import { Currency } from 'components/ui/index';
import { MagentoProductImgPrefix } from 'config/magento.config';
import { queryByPaging, queryBySearchKey, setSearchKey } from '../flow/action';
import styles from '../index.less';

const cx = classNames.bind(styles);
const { Search } = Input;
class TableView extends React.Component {
  componentDidMount() {
    this.props.queryByPaging();
  }
  buy = (record) => {
    console.log(record);
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
        <p className={cx('product-name')} title={locale === CHINESE_CODE ? record.product.name : record.product.name_en}>
            {locale === CHINESE_CODE ? record.product.name : record.product.name_en }
            </p>
        <p className={cx('product-sku')} title={record.product.sku}> {record.product.sku}</p>
      </div>),
    }, {
      title: formatMessage({ id: 'page.Inventory.productPic' }),
      key: 'pic',
      width: 100,
      render: (text, record) => (
        <Popover placement="right" content={<img className={cx('product-img-popover')} src={`${MagentoProductImgPrefix}${record.product.image_url}`} alt={record.product.name} />}>
          <img className={cx('product-img')} src={`${MagentoProductImgPrefix}${record.product.image_url}`} alt={record.product.name} />
        </Popover>),
    }, {
      title: formatMessage({ id: 'page.Inventory.lastStocking' }),
      key: 'lastStocking',
      width: 150,
      dataIndex: 'product.last_stocking_date',
    }, {
      title: formatMessage({ id: 'page.Inventory.currentInventory' }),
      dataIndex: 'current_quantity',
      key: 'current_quantity',
      width: 150,
    }, {
      title: formatMessage({ id: 'page.Inventory.soldDate' }),
      dataIndex: 'product.last_sold_date',
      key: 'soldDate',
      width: 150,
    }, {
      title: formatMessage({ id: 'page.Inventory.soldItems' }),
      dataIndex: 'product.sold_items',
      key: 'soldItems',
      width: 150,
    }, {
      title: formatMessage({ id: 'page.Inventory.unitCost' }),
      key: 'unitCost',
      render: (text, record) => <Currency value={record.unit_cost} />,
    }, {
      title: formatMessage({ id: 'page.Inventory.currentCost' }),
      key: 'currentCost',
      width: 150,
      render: (text, record) => <Currency value={record.total_value} />,
    }, {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      width: 350,
      render: (text, record) => (<Button onClick={() => { this.buy(record); }} size="small" type="primary">
        <Icon type="shopping-cart" />
        {formatMessage({ id: 'page.Inventory.restock' })}
        </Button>),
    }];
    return (
      <section>
        <div>
          <Search
            placeholder={formatMessage({ id: 'page.Inventory.searchPlaceHolder' })}
            onSearch={value => this.search(value)}
            enterButton
            className={cx('search-input')}
          />
        </div>
        <Table
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
};

export default connect(mapStateToProps, mapDispatchToProp)(injectIntl(TableView));
