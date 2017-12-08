import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout } from 'antd';
import { setPageTitle } from 'store/global/action';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import MiniCart from '../component/miniCart';
import styles from './index.less';

const { Sider, Content } = Layout;

const cx = classNames.bind(styles);

class order extends React.Component {
  state = {
    collapsed: false,
  };
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.order');
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div className={cx('section')}>
        <Layout>
          <Content><h2>this is other content</h2></Content>
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            collapsedWidth={0}
          >
            <MiniCart collapsed={this.state.collapsed} />
          </Sider>
        </Layout>
      </div>);
  }
}

order.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};
const mapDispatchToProp = {
  setPageTitle,
};

const Order = connect(null, mapDispatchToProp)(order);
export default Order;
