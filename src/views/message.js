import React from 'react';
import PropTypes from 'prop-types';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor', new Date(), this.props.match, this.props.location);
  }
  componentDidMount() {
    console.log('didmonut', new Date(), this.props.match, this.props.location);
  }

  componentWillUnmount() {
    console.log('willunmonut', new Date(), this.props.match, this.props.location);
  }
  render() {
    return (
      <h1>message{ this.props.match.params.id }</h1>
    );
  }
}
Message.propTypes = {
  match: PropTypes.objectOf({
    location: PropTypes.string,
    params: PropTypes.objectOf({
      id: PropTypes.number,
    }),
  }).isRequired,
};
