import React from 'react';
import { Tabs, Icon } from 'antd';

const TabPane = Tabs.TabPane;

class TabMenu extends React.Component {
  state = {
    isCollaspsed: true,
    activeKey: '0',
  }

  componentDidMount() {

  }
  componentWillUnmount() {

  }
  toggleMenu(isCollaspsed) {
    console.log(isCollaspsed, 'dandan');
    this.setState({ isCollaspsed });
    if(isCollaspsed){
      this.setState({
        activeKey: '0',
      });
    }
  }
  tabActive(e, tabKey) {
    e.preventDefault();
    e.stopPropagation();
    console.log('dandan tab', tabKey);
    this.setState({
      activeKey: tabKey,
    });
  }
  render() {
    return (
      <div onMouseEnter={() => { this.toggleMenu(false); }} onMouseLeave={() => { this.toggleMenu(true); }}>
        <Tabs activeKey={this.state.activeKey} type="card" onTabClick={() => { this.toggleMenu(false); }} className="tab-menu-container" >
          { this.state.isCollaspsed}
          <TabPane tab={<span onMouseOver={e => this.tabActive(e, '1')}>tab1 <Icon type={(!this.state.isCollaspsed) && this.state.activeKey === '1' ? 'up' : 'down'} /></span>} key="1">
            { this.state.isCollaspsed ? '' : 'Content of Tab Pane 1'}
          </TabPane>
          <TabPane tab={<span onMouseOver={e => this.tabActive(e, '2')}>tab2 <Icon type={(!this.state.isCollaspsed) && this.state.activeKey === '2' ? 'up' : 'down'} /></span>} key="2">
            { this.state.isCollaspsed ? '' : 'Content of Tab Pane 2'}
          </TabPane>
          <TabPane tab={<span onMouseOver={e => this.tabActive(e, '3')}>tab3 <Icon type={(!this.state.isCollaspsed) && this.state.activeKey === '3' ? 'up' : 'down'} /></span>} key="3">
            { this.state.isCollaspsed ? '' : 'Content of Tab Pane 3'}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default TabMenu;

