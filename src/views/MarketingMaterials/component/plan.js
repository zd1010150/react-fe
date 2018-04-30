import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Card, Carousel, Icon, Modal, Button } from 'antd';
import { cmsUrl } from 'config/env.config';
import classNames from 'classnames/bind';
import { QRcode } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { downloadFiles } from 'utils/download';
import styles from '../MarketingMaterials.less';
import multiDownload from 'multi-download';

const cx = classNames.bind(styles);
const { Grid } = Card;
class plan extends React.Component {
  state = {
    isDisplayPreview: false,
    previewSrc: '',
  }
  displayImg(src) {
    this.setState({
      isDisplayPreview: true,
      previewSrc: src,
    });
  }
  closePreview() {
    this.setState({
      isDisplayPreview: false,
    });
  }
  render() {
    const {
      pictures, videos, text, title, id, intl,
    } = this.props;
    const { formatMessage } = intl;
    const cardBodyStyle = {
      padding: '5px',
    };
    const outerGridStyle = {
      width: '27%',
      textAlign: 'center',
      padding: '5px',
      boxShadow: 'none',

    };
    const videGridStyle = {
      width: '27%',
      textAlign: 'center',
      padding: '55px 5px',
      boxShadow: 'none',
    };
    const qrGridStyle = {
      width: '19%',
      textAlign: 'center',
      padding: '45px 15px',
      boxShadow: 'none',
    };
    const picGridStyle = {
      width: '33.3%',
      textAlign: 'center',
      padding: '5px',
      border: 'none',
      boxShadow: 'none',
    };
    const videosEl = _.map(videos, (video, index) => {
      const { cover_image_url, video_url } = video;
      return (
        <div key={index}>
          <a className={cx('video-wrapper')} style={{ backgroundImage: `url(${cover_image_url})` }} href={video_url} target="_blank">
            <Icon type="play-circle" className={cx('video-play-btn')} />
          </a>
        </div>
      );
    });
    return (
      <div>
        <Card title={title} bodyStyle={cardBodyStyle} style={{ marginBottom: '10px' }} className={cx('plan-card')}>
          <Grid style={outerGridStyle}>
            <Card bodyStyle={cardBodyStyle} bordered={false}>
              {pictures.map((item, index) => <Grid style={picGridStyle} key={index}><img src={item.path} alt="marketing pic" className={cx('plan-img')} onClick={() => this.displayImg(item.path)} /></Grid>)}
            </Card>
          </Grid>
          <Grid style={videGridStyle} >
            <Carousel autoplay>
              {videosEl}
            </Carousel>
          </Grid>
          <Grid style={videGridStyle}>{text}</Grid>
          <Grid style={qrGridStyle}>
            <QRcode url={`${cmsUrl}${id}&tip=点击获取最新宣传图片`} width="160px" height="160px" />
            <Button onClick={() => {
              multiDownload(pictures.map(p => p.path));

              }}>{ formatMessage({ id: 'global.ui.button.download' })}
            </Button>
          </Grid>

        </Card>
        <Modal
          title=""
          visible={this.state.isDisplayPreview}
          footer={null}
          onCancel={() => this.closePreview()}
        >
          <img style={{ maxWidth: '100%' }} src={this.state.previewSrc} />
        </Modal>
      </div>
    );
  }
}


plan.defaultProps = {
  title: '',
  pictures: [],
  videos: {},
  text: '',
  id: 0,
};
plan.propTypes = {
  intl: intlShape.isRequired,
  title: PropTypes.string,
  pictures: PropTypes.array,
  videos: PropTypes.object,
  text: PropTypes.string,
  id: PropTypes.number,
};

export default injectIntl(plan);
