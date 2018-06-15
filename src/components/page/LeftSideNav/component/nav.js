/* eslint-disable react/prefer-stateless-function,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { intlShape } from 'react-intl';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { getParentUrl } from 'utils/url';
import { MagentoStaticLink } from 'components/ui/index';
import styles from '../LeftSideNav.less';

const cx = classNames.bind(styles);
const { SubMenu } = Menu;
const DIVIDER = 'divider';
class Nav extends React.Component {
  state = {
    openKeys: ['clientLists'],
  };
  onOpenChange = (openKeys) => {
    if (openKeys.length < 1) return;
    openKeys.shift();
    this.setState({
      openKeys,
    });
  }
  render() {
    const { intl, location } = this.props;
    const { formatMessage } = intl;
    // magento static nav
    const magentoNavObj = [
      { id: 'global.magento.leftNav.accountDashboard', url: '/customer/account/index/' },
      { id: 'global.magento.leftNav.myOrders', url: '/sales/order/history/' },
      { id: 'global.magento.leftNav.myWishList', url: '/wishlist/' },
      DIVIDER,
      { id: 'global.magento.leftNav.accountInformation', url: '/customer/account/edit/' },
      { id: 'global.magento.leftNav.addressBook', url: '/customer/address/new/' },
      { id: 'global.magento.leftNav.storedPaymentMethods', url: '/vault/cards/listaction/' },
      DIVIDER,
      { id: 'global.magento.leftNav.myProductsReviews', url: '/review/customer/' },
      { id: 'global.magento.leftNav.newsletterSubscription', url: '/newsletter/manage/' },
    ];
    // affiliate nav
    const affiliateNavObj = [
      {
        id: 'page.LeftSideNav.leads',
        url: '/leads',
      }, {
        id: 'page.LeftSideNav.accounts',
        url: '/accounts',
      }, {
        id: 'page.LeftSideNav.order',
        url: '/order',
      }, {
        id: 'page.LeftSideNav.trackOrders',
        url: '/trackOrders',
      },
      DIVIDER,
      {
        id: 'page.LeftSideNav.priceSetting',
        url: '/priceSetting',
      }, {
        id: 'page.LeftSideNav.marketingMaterial',
        url: '/marketingMaterial',
      },
    ];
    const getChildrenTree = (item, index) => {
      if (item === DIVIDER) {
        return <Menu.Divider key={index} />;
      }
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            title={formatMessage({ id: item.id })}
            key={item.url}
            onTitleClick={() => {}}
          >
            { item.children.map(cItem => getChildrenTree(cItem))}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.url} className={cx('left-nav-item')}>
          <NavLink to={item.url}>{ formatMessage({ id: item.id }) }</NavLink>
        </Menu.Item>);
    };

    const magentoNav = () => magentoNavObj.map((item, index) => {
      if (item === DIVIDER) {
        return <Menu.Divider key={index} />;
      }
      return (
        <Menu.Item key={item.id} className={cx('left-nav-item')}>
          <MagentoStaticLink titleId={item.id} href={item.url} />
        </Menu.Item>
      );
    });
    const affliateNav = () => affiliateNavObj.map((item, index) => getChildrenTree(item, index));
    // insert affliateNav
    const magentoSubmenu = (
      <SubMenu
        title={formatMessage({ id: 'page.LeftSideNav.myAccount' })}
        key="myAccount"
        onTitleClick={() => {}}
      >
        { magentoNav() }
      </SubMenu>
    );
    const affiliateSubmenu = (
      <SubMenu
        title={formatMessage({ id: 'page.LeftSideNav.clientLists' })}
        key="clientLists"
        onTitleClick={() => {}}
      >
        { affliateNav() }
      </SubMenu>
    );
    return (
      <div>
        <Menu
          mode="inline"
          inlineIndent={30}
          onOpenChange={this.onOpenChange}
          openKeys={this.state.openKeys}
          className={classNames(cx('left-side-nav'), 'left-side-nav')}
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={["clientLists"]}
          selectedKeys={[location.pathname]}
        >
          { magentoSubmenu }
          { affiliateSubmenu }
        </Menu>
      </div>
    );
  }
}


Nav.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
};

export default Nav;
