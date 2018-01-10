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
    const { images, video, text } = this.props;
    return (
      <div className={cx('cms-content-wrapper')}>
        <Row>
          <Col span={12}>
            <p>{text}</p>
          </Col>
          <Col span={12}>
            <video>
              <source src={video} />
            </video>
          </Col>

        </Row>
        <Row>
          {images.map(item =>
            (
              <Col span={24}>
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
  video: '',
  text: '',
};
cmsView.propTypes = {
  getMaterial: PropTypes.func.isRequired,
  images: PropTypes.array,
  video: PropTypes.string,
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
