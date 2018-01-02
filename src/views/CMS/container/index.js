/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { getMaterial } from '../flow/action';

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
      <div>
        {images.map(item => <img src={item.path} alt="marketing material image" />)}
        <video>
          <source src={video} />
        </video>
        <p>{text}</p>
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

const CmsView = connect(mapStateToProp, mapDispatchToProp)(cmsView);
export default CmsView;
