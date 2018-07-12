import React from 'react';
// import 'rc-input-number/assets/index.css';
import PropTypes from 'prop-types';
import { Button, Table, Modal } from 'antd';
import { InputNumber, Currency } from 'components/ui/index';
// import InputNumber from 'rc-input-number';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';


const cx = classNames.bind(styles);

class goods extends React.Component {
  state = {
    isDisplayPreview: false,
    previewSrc: '',
  }
  displayImg(src) {
    this.setState({
      isDisplayPreview: true,
      previewSrc: src,
    });
  }
  closePreview() {
    this.setState({
      isDisplayPreview: false,
    });
  }
  render() {
    const {
      goodsData, intl, addGoodsToCart, selectingGoods, goodsTablePagination, queryGoodsByPaging,
    } = this.props;
    const { formatMessage } = intl;
    const columns = [{
      title: formatMessage({ id: 'global.properNouns.goods.name' }),
      key: 'name',
      width: 120,
      render: (text, record) => <p className={cx('goods-product-name')}>{record.name}<br /><small className={cx('goods-product-sku')}>{record.sku}</small></p>,
    }, {
      title: formatMessage({ id: 'global.properNouns.goods.picture' }),
      key: 'picture',
      render: (text, record) => <img src={record.picture} alt="goods pic" className="product-thumbnail" onClick={() => this.displayImg(record.picture)} />,
    }, {
      title: formatMessage({ id: 'global.properNouns.goods.quantity' }),
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
    }, {
      title: formatMessage({ id: 'global.properNouns.goods.unitPrice' }),
      key: 'unitPrice',
      render: (text, record) => <Currency value={record.unitPrice} />,
      width: 50,
    }, {
      title: formatMessage({ id: 'global.properNouns.goods.recommendedPrice' }),
      key: 'recommendedPrice',
      render: (text, record) => <Currency value={record.recommendedPrice} />,
      width: 50,
    }, {
      title: formatMessage({ id: 'global.properNouns.goods.orderQuantity' }),
      key: 'orderQuantity',
      width: 100,
      render: (text, record) => (<InputNumber
        min={0}
        value={record.selectingQuantity}
        max={record.availableQuantity}
        onChange={(value) => {
          selectingGoods(record, value);
        }}
      />),
    },
    {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      width: 150,
      render: (text, record) => (
        <span>
          <Button size="small" type="primary" shape="circle" onClick={() => { addGoodsToCart(record); }} icon="shopping-cart" />
        </span>
      ),
    }];
    const pagination = {
      defaultCurrent: goodsTablePagination.currentPage,
      current: goodsTablePagination.currentPage,
      defaultPageSize: goodsTablePagination.perPage,
      pageSize: goodsTablePagination.perPage,
      total: goodsTablePagination.total,
      onChange(page, pageSize) {
        queryGoodsByPaging(pageSize, page);
      },
    };
    return (
      <div className="block">
        <div className="block-content">
          <Table columns={columns} size="small" dataSource={goodsData} pagination={pagination} className={cx('choose-goods-table')} rowKey="id" />
          <Modal
            title=""
            visible={this.state.isDisplayPreview}
            footer={null}
            onCancel={() => this.closePreview()}
          >
            <img style={{ maxWidth: '100%' }} src={this.state.previewSrc} />
          </Modal>
        </div>
      </div>);
  }
}

goods.defaultProps = {
  goodsData: [],
};
goods.propTypes = {
  intl: intlShape.isRequired,
  goodsData: PropTypes.array,
  addGoodsToCart: PropTypes.func.isRequired,
  selectingGoods: PropTypes.func.isRequired, // 加入到购物车的数量
  goodsTablePagination: PropTypes.object.isRequired,
  queryGoodsByPaging: PropTypes.func.isRequired,
};
const GoodsView = injectIntl(goods);
export default GoodsView;
