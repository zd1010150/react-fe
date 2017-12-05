import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';

const { SubMenu } = Menu;

class Nav extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  }
  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const hello = formatMessage({ id: 'global.ui.button.cancel' });
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 240 }}
        defaultSelectedKeys={['5']}
        defaultOpenKeys={['5']}
        mode="inline"
      >
        <SubMenu key="sub2" title={<span>Navigation Two</span>}>
          <Menu.Item key="5"><Link to="/about">About{ hello }</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/game">Game</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span>Navigation Three</span>}>
          <Menu.Item key="9"><Link to="/inbox">Inbox</Link></Menu.Item>
          <Menu.Item key="10"><Link to="/todo">Tod</Link></Menu.Item>
          <Menu.Item key="11"><Link to="/inbox">Inbox2</Link></Menu.Item>
          <Menu.Item key="12"><Link to="/inbox">Inbox3</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

Nav.propTypes = {
  intl: intlShape.isRequired,
};
export default injectIntl(Nav);
