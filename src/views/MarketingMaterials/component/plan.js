import React from 'react';
import PropTypes from 'prop-types';
import { Card, Carousel } from 'antd';
import { cmsUrl } from 'config/env.config';
import classNames from 'classnames/bind';
import { QRcode } from 'components/ui/index';
import styles from '../MarketingMaterials.less';

const cx = classNames.bind(styles);
const { Grid } = Card;
const plan = ({
  pictures, videos, text, title, id,
}) => {
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
  return (
    <Card title={title} bodyStyle={cardBodyStyle} style={{ marginBottom: '10px' }} className={cx('plan-card')}>
      <Grid style={outerGridStyle}>
        <Card bodyStyle={cardBodyStyle} bordered={false}>
          {pictures.map((item, index) => <Grid style={picGridStyle} key={index}><img src={item.path} alt="marketing pic" className={cx('plan-img')} /></Grid>)}
        </Card>
      </Grid>
      <Grid style={videGridStyle}>
        <Carousel autoplay>
          {
            videos.map((video, index) =>
              (<video width="100%" key={index}>
                <source src={video} />
               </video>))
          }
        </Carousel>

      </Grid>
      <Grid style={videGridStyle}>{text}</Grid>
      <Grid style={qrGridStyle}><QRcode url={`${cmsUrl}${id}`} width="160px" height="160px" /> </Grid>
    </Card>
  );
};
plan.defaultProps = {
  title: '',
  pictures: [],
  videos: [],
  text: '',
  id: 0,
};
plan.propTypes = {
  title: PropTypes.string,
  pictures: PropTypes.array,
  videos: PropTypes.array,
  text: PropTypes.string,
  id: PropTypes.number,
};

export default plan;
