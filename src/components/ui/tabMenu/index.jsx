import React from 'react';
import _ from 'lodash';
import { Tabs, Icon } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './index.less';


const cx = classNames.bind(styles);
const { TabPane } = Tabs;

class TabMenu extends React.Component {
  state = {
    isCollaspsed: true,
    selectedMenuId: undefined,
    parentMenuId: this.props.defaultSelectedMenuId,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultSelectedMenuId !== this.props.defaultSelectedMenuId) {
      this.setState({
        parentMenuId: nextProps.defaultSelectedMenuId,
      });
    }
  }
  toggleMenu(isCollaspsed) {
    this.setState({ isCollaspsed });
  }
  clickMenu(parentMenuId, menuId, noChild) {
    this.setState({
      isCollaspsed: false,
      parentMenuId,
    });
    if (menuId !== undefined) {
      this.setState({
        selectedMenuId: menuId,
      });
    }
    if (noChild) {
      this.props.onSelected(menuId || parentMenuId);
    }
  }
  buildSubMenu = (parentMenuId, subCategories) => {
    const { left, top, right } = this.$wrapper.getBoundingClientRect();
    const width = right - left;
    const y = top + 41;
    return (
      <ul className={cx('sub-menus')} style={{ width, left, top: y }}>
        {
          subCategories.map(s =>
            (
              <li key={s.id} className={classNames(cx('sub-menu'))}>
                <a
                  className={classNames(cx('sub-menu-title'), cx(s.id === this.state.selectedMenuId ? 'selected-menu' : ''))}
                  href="javascript:void(0)"
                  onClick={() => this.clickMenu(parentMenuId, s.id, _.isEmpty(s.subCategories))}
                >
                  {s.menuTitle}
                </a>
              </li>
            ))
        }
      </ul>
    );
  }
  render() {
    const { menus } = this.props;
    return (
      <div onMouseLeave={() => { this.toggleMenu(true); }} className="card-container" ref={r => this.$wrapper = r}>
        <Tabs
          activeKey={`${this.state.parentMenuId}`}
          type="card"
          className={classNames('tab-menu', cx(this.state.isCollaspsed ? '' : 'tab-menu-container-open'))}
        >
          { menus.map(m => (
            <TabPane
              tab={
                <span
                  className={classNames('tabmenu-title-tab', cx(m.id === this.state.parentMenuId ? 'tabmenu-title-tab-selected' : ''))}
                  onClick={() => this.clickMenu(m.id, undefined, _.isEmpty(m.subCategories))}
                  onMouseEnter={() => this.clickMenu(m.id, undefined, _.isEmpty(m.subCategories))}
                >
                  { m.menuTitle }
                  {
                    _.isEmpty(m.subCategories) ? '' : <Icon className="pl-sm" type={(!this.state.isCollaspsed) && this.state.parentMenuId === m.id ? 'up' : 'down'} />
                  }

                </span>
                }
              key={`${m.id}`}
            >
              { (!this.state.isCollaspsed) && (!_.isEmpty(m.subCategories)) ? this.buildSubMenu(m.id, m.subCategories) : ''}
            </TabPane>
            ))
          }
        </Tabs>
      </div>
    );
  }
}
TabMenu.defaultProps = {
  onSelected: null,
};
TabMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  onSelected: PropTypes.func,
  defaultSelectedMenuId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default TabMenu;

