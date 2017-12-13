import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import MiniCart from './miniCart';
import styles from '../Order.less';

const { Sider, Content } = Layout;

const cx = classNames.bind(styles);

class chooseGood extends React.Component {
  state = {
    collapsed: false,
  };
  toggle() {
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
            onClick={() => { this.toggle(); }}
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

chooseGood.propTypes = {
  intl: intlShape.isRequired,
};
const ChooseGood = injectIntl(chooseGood);
export default ChooseGood;
