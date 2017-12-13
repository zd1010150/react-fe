

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
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
  }
  render() {
    return (
      <section className="section section-page">
        {/* <div className="section-content"><Skeleton category={mockCategory} plans={mockMaterial} /></div> */}
      </section>);
  }
}
mmView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};
const mapDispatchToProp = {
  setPageTitle,
};

const MmView = connect(null, mapDispatchToProp)(mmView);
export default MmView;

