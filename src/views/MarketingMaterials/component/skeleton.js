import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Radio } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import Plan from './plan';

const { TabPane } = Tabs;
class skeleton extends React.Component {
  handleLanguageChange = (e) => {
    const language = e.target.value;
    this.props.setMMLanguage(language);
  }
  handleCategoryChange = (categoryId) => {
    this.props.setMMCategory(categoryId);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      plans, category, categorys, language,
    } = this.props;
    return (
      <div>
        <Radio.Group onChange={(e) => { this.handleLanguageChange(e); }} value={language} style={{ marginBottom: 8 }}>
          <Radio.Button value="zh">{ formatMessage({ id: 'global.language.zh' }) }</Radio.Button>
          <Radio.Button value="en">{ formatMessage({ id: 'global.language.en' }) }</Radio.Button>
        </Radio.Group>
        <Tabs
          activeKey={`${category}`}
          onChange={
            (categoryId) => {
              this.handleCategoryChange(Number(categoryId));
            }
            }
        >
          {categorys.map(item => (<TabPane tab={item.name} key={`${item.id}`} />))}
        </Tabs>
        {
          plans.map(plan =>
            (<Plan
              key={plan.id}
              title={plan.title}
              pictures={plan.images}
              videos={plan.video_urls}
              text={plan.description}
              id={plan.id}
            />))
        }
      </div>
    );
  }
}
skeleton.defaultProps = {
  plans: [],
  categorys: [],
  category: 0,
};
skeleton.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
  categorys: PropTypes.array,
  category: PropTypes.number,
  plans: PropTypes.array,
  setMMCategory: PropTypes.func.isRequired,
  setMMLanguage: PropTypes.func.isRequired,
};
const Skeleton = injectIntl(skeleton);
export default Skeleton;
