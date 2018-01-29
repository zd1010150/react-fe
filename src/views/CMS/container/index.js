/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { toggleVideo, getMaterial} from '../flow/action';
import { Row, Col, Icon } from 'antd';
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
  toggleVideo(videoId){
    this.props.toggleVideo(videoId);
  }
  render() {
    const { images, videos, text } = this.props;
    const videosEl = _.map(videos, (video, index) => {
      const { cover_image_url, video_url } = video;
      if (!video.isPlaying) {
        return (
          <div key={index} className={cx('slide-wrapper')}>
            <div
              className={cx('video-wrapper')}
              style={{ backgroundImage: `url(${cover_image_url})` }}
              onClick={() => this.toggleVideo(index)}
            >
              <Icon type="play-circle" className={cx('video-play-btn')} />
            </div>
          </div>
        );
      }
      return (
        <div key={index} className={cx('slide-wrapper')}>
          <video className={cx('video-wrapper')} controls autoPlay>
            <source src={video_url} />
          </video>
        </div>
      );
    });
    return (
      <div className={cx('cms-content-wrapper')}>
        <Row>
          <Col span={24}>
            <p>{text}</p>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            { videosEl }
          </Col>

        </Row>
        <Row>
          {images.map((item, index) =>
            (
              <Col span={8} key={index}>
                <div className={cx('image-wrapper')}>
                  <img src={item.path} alt="marketing material image" key={item.path} className={cx('cms-image')} />
                </div>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}
cmsView.defaultProps = {
  images: [],
  videos: {},
  text: '',
};
cmsView.propTypes = {
  getMaterial: PropTypes.func.isRequired,
  toggleVideo: PropTypes.func.isRequired,
  images: PropTypes.array,
  videos: PropTypes.object,
  text: PropTypes.string,
};
const mapStateToProp = ({ cms }) => ({
  ...cms.cmsContent,
});
const mapDispatchToProp = {
  getMaterial,
  toggleVideo,
};

const CmsView = withRouter(connect(mapStateToProp, mapDispatchToProp)(cmsView));
export default CmsView;
