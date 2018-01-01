import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Radio } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import Plan from './plan';

const { TabPane } = Tabs;
class skeleton extends React.Component {
  state = {
    language: 'zh',
    category: (this.props.category && this.props.category[0] && this.props.category[0].id) || '',
  }
  componentDidMount() {
    this.props.setMMCategory(this.state.category);
    this.props.setMMLanguage(this.state.language);
  }
  handleModeChange = (e) => {
    const language = e.target.value;
    this.setState({ language });
    this.props.setMMLanguage(language);
  }
  handleCategoryChange = (categoryId) => {
    this.setState({ category: categoryId });
    this.props.setMMCategory(categoryId);
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { plans, category } = this.props;
    return (
      <div>
        <Radio.Group onChange={(e) => { this.handleLanguageChange(e); }} value={this.state.language} style={{ marginBottom: 8 }}>
          <Radio.Button value="zh">{ formatMessage({ id: 'global.language.zh' }) }</Radio.Button>
          <Radio.Button value="en">{ formatMessage({ id: 'global.language.en' }) }</Radio.Button>
        </Radio.Group>
        <Tabs
          defaultActiveKey={this.state.category}
          activeKey={this.state.category}
          style={{ height: 220 }}
          onChange={
            (categoryId) => {
              this.handleCategoryChange(categoryId);
            }
            }
        >
          {category.map(item => (<TabPane tab={item.name} key={item.id} />))}
        </Tabs>
        {
          plans.map(plan =>
            (<Plan
              key={plan.id}
              title={plan.title}
              pictures={plan.images}
              video={plan.video_urls && plan.video_urls[0]}
              text={plan.description}
            />))
        }
      </div>
    );
  }
}
skeleton.defaultProps = {
  plans: [],
};
skeleton.propTypes = {
  intl: intlShape.isRequired,
  category: PropTypes.array,
  plans: PropTypes.array,
  setMMCategory: PropTypes.func.isRequired,
  setMMLanguage: PropTypes.func.isRequired,
};
const Skeleton = injectIntl(skeleton);
export default Skeleton;
