import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { QRcode } from 'components/ui/index';

const { Grid } = Card;
const plan = ({
  pictures, video, text, title,
}) => {
  const outerGridStyle = {
    width: '27%',
    textAlign: 'center',
  };
  const qrGridStyle = {
    width: '19%',
    textAlign: 'center',
  };
  const picGridStyle = {
    width: '33.3%',
    textAlign: 'center',
  };
  return (
    <Card title={title}>
      <Grid style={outerGridStyle}>
        <Card>
          {pictures.map((item, index) => <Grid style={picGridStyle} key={index}><img src={item.path} alt="marketing pic" /></Grid>)}
        </Card>
      </Grid>
      <Grid style={outerGridStyle}><img src={video} alt="video thumbnail pic" /></Grid>
      <Grid style={outerGridStyle}>{text}</Grid>
      <Grid style={qrGridStyle}><QRcode url={url} width="100%" height="100%" /></Grid>
    </Card>
  );
};
plan.defaultProps = {
  title: '',
  pictures: [],
  video: '',
  text: '',
};
plan.propTypes = {
  title: PropTypes.string,
  pictures: PropTypes.array,
  video: PropTypes.string,
  text: PropTypes.string,
};

export default plan;
