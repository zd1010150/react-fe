/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { toggleVideo, getMaterial } from '../flow/action';
import { Row, Col, Icon, Carousel, Modal } from 'antd';
import styles from '../CMS.less';

const cx = classNames.bind(styles);
class cmsView extends React.Component {
  constructor(props) {
    super(props);
    const { location } = props;
    const pairs = queryString.parse(location.search);

    this.state = {
      id: pairs.id || 0,
      isCarouselVisible: false,
    };
  }
  componentDidMount() {
    this.props.getMaterial(this.state.id);
  }
  toggleVideo(videoId) {
    this.props.toggleVideo(videoId);
  }
  display(index) {
    this.setState({
      isCarouselVisible: true,
    });
    this.carousel.goTo(index);
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
            <a className={cx('video-download-btn')} href={video_url} download><Icon type="download" /></a>
          </div>
        );
      }
      return (
        <div key={index} className={cx('slide-wrapper')}>
          <video className={cx('video-wrapper')} controls autoPlay>
            <source src={video_url} />
          </video>
          <a className={cx('video-download-btn')} href={video_url} download><Icon type="download" /></a>
        </div>
      );
    });
    return (
      <div className={cx('cms-content-wrapper')}>
        <Row>
          <Col span={24}>
            <p className={cx('content')}>{text}</p>
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
                  <img src={item.path} alt="marketing material image" key={item.path} className={cx('cms-image')} onClick={() => { this.display(index); }} />
                </div>
              </Col>
            ))}
        </Row>
        <div className={classNames(cx(this.state.isCarouselVisible ? 'model-visible' : 'model-invisible'), 'pic-modal')} >
          <div className={cx(this.state.isCarouselVisible ? 'carousel-visible' : 'carousel-invisible')}>
            <Icon type="step-backward" className={cx('prev-btn')} onClick={() => this.carousel.prev()} />
            <Icon type="step-forward" className={cx('next-btn')} onClick={() => this.carousel.next()} />
            <div className={cx('carousel')}>
              <Icon type="close" className={cx('close-btn')} onClick={() => this.setState({ isCarouselVisible: false })} />
              <Carousel ref={(carousel) => { this.carousel = carousel; }} >
                {images.map(item =>
                    (
                      <div className={cx('carousel-image-wrapper')} key={item.path}>
                        <img className={cx('carousel-image')} src={item.path} alt="marketing material image" key={item.path} />
                      </div>
                    ))}
              </Carousel>
            </div>
          </div>

        </div>
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
