/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { MagentoStaticLink } from 'src/components/ui/index';
import { getAbsolutePath } from 'src/config/magento.config';

const operatorView = ({ intl, account, language }) => {
  const { formatMessage } = intl;
  const operations = [
    { id: 'global.magento.topOperations.myAccount', href: '/customer/account/' },
    { id: 'global.magento.leftNav.myWishList', href: '/wishlist' },
  ];
  const menu = (
    <Menu>
      { operations.map((item, index) => (
        <Menu.Item key={index}>
          <MagentoStaticLink titleId={item.id} href={item.href} />
        </Menu.Item>
      ))
      }
      <Menu.Item>
        <form action={getAbsolutePath('customer/account/logout', language)} name="signOutForm">
          <input type="hidden" name="form_key" value="123" />
          { /* 此处是mock，具体的form_key 需要链接的时候从cookie读取 */}
          <a href="javascript:void(0)" onClick={() => { document.forms.signOutForm.submit(); }} >
            {formatMessage({ id: 'global.magento.topOperations.signOut' })}
          </a>
        </form>
      </Menu.Item>

    </Menu>);
  return (
    <div data-role="operations">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          { account.username} <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  );
};


operatorView.propTypes = {
  language: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  account: PropTypes.objectOf(PropTypes.string).isRequired,
};

const Operator = injectIntl(operatorView);
export default Operator;
