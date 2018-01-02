import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import classNames from 'classnames/bind';
import { QRcode } from 'components/ui/index';
import styles from '../MarketingMaterials.less';

const cx = classNames.bind(styles);
const { Grid } = Card;
const plan = ({
  pictures, video, text, title,
}) => {
  const cardBodyStyle = {
    padding: '5px',

  }
  const outerGridStyle = {
    width: '27%',
    textAlign: 'center',
    padding: '5px',
    boxShadow: 'none',
  };
  const qrGridStyle = {
    width: '19%',
    textAlign: 'center',
    padding: '5px',
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
    <Card title={title} bodyStyle={cardBodyStyle} style={{ marginBottom: '10px' }}>
      <Grid style={outerGridStyle}>
        <Card bodyStyle={cardBodyStyle} bordered={false}>
          {pictures.map((item, index) => <Grid style={picGridStyle} key={index}><img src={item.path} alt="marketing pic" className={cx('plan-img')} /></Grid>)}
        </Card>
      </Grid>
      <Grid style={outerGridStyle}>
        <video>
          <source src={video} />
        </video>
      </Grid>
      <Grid style={outerGridStyle}>{text}</Grid>
      <Grid style={qrGridStyle}>{/* <QRcode url={url} width="100%" height="100%" /> */}</Grid>
    </Card>
  );
};
plan.defaultProps = {
  title: '',
  pictures: [],
  video: '',
  text: '',
  id: 0,
};
plan.propTypes = {
  title: PropTypes.string,
  pictures: PropTypes.array,
  video: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.number,
};

export default plan;
