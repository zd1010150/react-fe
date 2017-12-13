//
//
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Tabs, Radio } from 'antd';
// import { intlShape, injectIntl } from 'react-intl';
// import Plan from './plan';
// class skeleton extends React.Component {
//   state = {
//     language: 'zh',
//   }
//   handleModeChange = (e) => {
//     const language = e.target.value;
//     this.setState({ language });
//   }
//   render() {
//     const { formatMessage } = this.props.intl;
//
//     return (
//       <div>
//         <Radio.Group onChange={() => { this.handleLanguageChange(); }} value={this.state.language} style={{ marginBottom: 8 }}>
//           <Radio.Button value="zh">{ formatMessage({ id: 'global.language.zh' }) }</Radio.Button>
//           <Radio.Button value="en">{ formatMessage({ id: 'global.language.en' }) }</Radio.Button>
//         </Radio.Group>
//         <Tabs
//           defaultActiveKey="1"
//           style={{ height: 220 }}
//         >
//           <TabPane tab="Tab 1" key="1"><Plan detail={ detail } /></TabPane>
//           <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
//           <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
//           <TabPane tab="Tab 4" key="4">Content of tab 4</TabPane>
//           <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
//           <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
//           <TabPane tab="Tab 7" key="7">Content of tab 7</TabPane>
//           <TabPane tab="Tab 8" key="8">Content of tab 8</TabPane>
//           <TabPane tab="Tab 9" key="9">Content of tab 9</TabPane>
//           <TabPane tab="Tab 10" key="10">Content of tab 10</TabPane>
//           <TabPane tab="Tab 11" key="11">Content of tab 11</TabPane>
//         </Tabs>
//       </div>
//     );
//   }
// }
// skeleton.propTypes = {
//   intl: intlShape.isRequired,
//   category: PropTypes.array(PropTypes.obj),
//   plans
// };
// const Skeleton = injectIntl(skeleton);
// export default Skeleton;
