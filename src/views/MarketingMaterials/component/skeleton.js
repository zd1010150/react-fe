import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Pagination } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { TabMenu } from 'components/ui/index';
import Plan from './plan';
import { paginationPayload } from '../flow/reducer';
import styles from '../MarketingMaterials.less';


const cx = classNames.bind(styles);


class skeleton extends React.Component {
  componentDidMount() {
    this.fetchMarketMaterial(this.props);
  }
  componentWillReceiveProps(nextProps) {
    const { language, category } = nextProps;

    if (language !== this.props.language || category !== this.props.category) {
      this.fetchMarketMaterial(nextProps);
    }
  }
  getClassificationPagination = (props) => {
    const { allPaginations, category, language } = props;
    const pagination = allPaginations.filter(p => (p.language === language) && (p.classificationId === category));
    return pagination.length < 1 ? paginationPayload : { ...pagination[0].pagination };
  }
  handleLanguageChange = (e) => {
    const language = e.target.value;
    this.props.setMMLanguage(language);
  }
  handleCategoryChange = (categoryId) => {
    this.props.setMMCategory(categoryId);
  }
  fetchMarketMaterial(props) {
    const { language, category, getMarketingMaterial } = props;
    const pagination = this.getClassificationPagination(props);
    getMarketingMaterial(language, category, pagination.perPage, pagination.currentPage);
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      plans, category, categorys, language, getMarketingMaterial,
    } = this.props;
    const pagination = this.getClassificationPagination(this.props);
    const paginationConfig = {
      defaultCurrent: pagination.currentPage,
      current: pagination.currentPage,
      defaultPageSize: pagination.perPage,
      pageSize: pagination.perPage,
      total: pagination.total,
      onChange(page, pageSize) {
        getMarketingMaterial(language, category, pageSize, page);
      },
    };
    return (
      <div className={cx('wrapper')}>
        <Radio.Group className={cx('language-radios')} onChange={(e) => { this.handleLanguageChange(e); }} value={language} style={{ marginBottom: 8 }}>
          <Radio.Button value="zh">{ formatMessage({ id: 'global.language.zh' }) }</Radio.Button>
          <Radio.Button value="en">{ formatMessage({ id: 'global.language.en' }) }</Radio.Button>
        </Radio.Group>
        <TabMenu menus={categorys} onSelected={categoryId => this.handleCategoryChange(categoryId)} />
        <div className={cx('plan-wrapper')}>
          {
            plans.map(plan =>
              (<Plan
                key={plan.id}
                title={plan.title}
                pictures={plan.images}
                videos={plan.videos}
                text={plan.description}
                id={plan.id}
              />))
          }
        </div>
        <Pagination className={cx('pagination')} {...paginationConfig} />
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
  getMarketingMaterial: PropTypes.func.isRequired,
  allPaginations: PropTypes.array.isRequired,

};
const Skeleton = injectIntl(skeleton);
export default Skeleton;
