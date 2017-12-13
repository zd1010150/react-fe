import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { QRcode } from 'src/components/ui/index';

const { Grid } = Card;
const plan = ({ category, detail }) => {
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
  const {
    pictures, video, text, url,
  } = detail;
  return (
    <Card title={category}>
      <Grid style={outerGridStyle}>
        <Card>
          {pictures.map((item, index) => <Grid style={picGridStyle} key={index}><img src={item} alt="marketing pic" /></Grid>)}
        </Card>
      </Grid>
      <Grid style={outerGridStyle}><img src={video} alt="video thumbnail pic" /></Grid>
      <Grid style={outerGridStyle}>{text}</Grid>
      <Grid style={qrGridStyle}><QRcode url={url} width="100%" height="100%" /></Grid>
    </Card>
  );
};

plan.propTypes = {
  category: PropTypes.string.isRequired,
  detail: PropTypes.obj.isRequired,
};

export default plan;
