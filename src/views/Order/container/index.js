import React from 'react';
import { Icon, Layout } from 'antd';
import classNames from 'classnames/bind';
import MiniCart from '../component/miniCart';
import styles from './index.less';

const { Sider, Content } = Layout;

const cx = classNames.bind(styles);

class Order extends React.Component {
  state = {
    collapsed: false,
  };
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


export default Order;
