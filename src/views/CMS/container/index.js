/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import getMaterial from '../flow/action';
import { Row, Col } from 'antd';
import styles from '../CMS.less';

const cx = classNames.bind(styles);
class cmsView extends React.Component {
  constructor(props) {
    super(props);
    const { location } = props;
    const pairs = queryString.parse(location.search);
    this.state = {
      id: pairs.id || 0,
    };
  }
  componentDidMount() {
    this.props.getMaterial(this.state.id);
  }
  render() {
    const { images, videos, text } = this.props;
    return (
      <div className={cx('cms-content-wrapper')}>
        <Row>
          <Col span={24}>
            <p>{text}</p>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            {
              videos.map((video, index) =>
                (<video width="100%" controls key={index}>
                  <source src={video} />
                </video>))
            }
          </Col>

        </Row>
        <Row>
          {images.map(item =>
            (
              <Col span={8}>
                <img src={item.path} alt="marketing material image" key={item.path} className={cx('cms-image')} />
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}
cmsView.defaultProps = {
  images: [],
  videos: [],
  text: '',
};
cmsView.propTypes = {
  getMaterial: PropTypes.func.isRequired,
  images: PropTypes.array,
  videos: PropTypes.array,
  text: PropTypes.string,
};
const mapStateToProp = ({ cms }) => ({
  ...cms.cmsContent,
});
const mapDispatchToProp = {
  getMaterial,
};

const CmsView = withRouter(connect(mapStateToProp, mapDispatchToProp)(cmsView));
export default CmsView;
