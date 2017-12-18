

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import { getMarketingMaterial } from '../flow/action';
import Skeleton from '../component/skeleton';

const mockCategory = [{
  title: '健康方案',
  key: '1',
}, {
  title: '年龄',
  key: '2',
}];
const mockMaterial = [{
  category: '健康方案',
  materials: [{
    planName: '心脑血管疾病',
    detail: {
      pictures: ['http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      ],
      videos: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      text: ' this is test introduction',
      planId: 'pic-1',
      url: 'http://www.goolgle.com.au',
    },
  }, {
    planName: '心脑血管疾病2',
    detail: {
      pictures: ['http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      ],
      videos: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      text: ' this is test introduction',
      planId: 'pic-1',
      url: 'http://www.goolgle.com.au',
    },
  }, {
    planName: '心脑血管疾病3',
    detail: {
      pictures: ['http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      ],
      videos: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      text: ' this is test introduction',
      planId: 'pic-1',
      url: 'http://www.goolgle.com.au',
    },
  }],
}, {
  category: '年龄方案',
  materials: [{
    planName: '年轻人',
    detail: {
      pictures: ['http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      ],
      videos: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      text: ' this is test introduction',
      planId: 'pic-1',
      url: 'http://www.goolgle.com.au',
    },
  }, {
    planName: '中脑年人',
    detail: {
      pictures: ['http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      ],
      videos: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      text: ' this is test introduction',
      planId: 'pic-1',
      url: 'http://www.goolgle.com.au',
    },
  }, {
    planName: '婴儿',
    detail: {
      pictures: ['http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
        'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      ],
      videos: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      text: ' this is test introduction',
      planId: 'pic-1',
      url: 'http://www.goolgle.com.au',
    },
  }],
}];
class mmView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.marketingMaterial');
    this.props.getMarketingMaterial();
  }
  render() {
    return (
      <section className="section section-page">
        <span>loading: { JSON.stringify(this.props.loading)} </span>
        { JSON.stringify(this.props.marketingMaterials) }
      </section>);
  }
}
mmView.defaultProps = {
  marketingMaterials: {},
};
mmView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  marketingMaterials: PropTypes.object,
  getMarketingMaterial: PropTypes.func.isRequired,
};
const mapStateToProp = state => ({
  marketingMaterials: state.marketingMaterials,
  loading: state.loading,
});
const mapDispatchToProp = {
  setPageTitle,
  getMarketingMaterial,
};

const MmView = connect(mapStateToProp, mapDispatchToProp)(mmView);
export default MmView;

