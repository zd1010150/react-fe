import React from 'react';
import PropTypes from 'prop-types';

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.props.handleClick.bind(this);
  }
  render() {
    if (this.props.active) {
      return (
        <span> {this.props.children} </span>
      );
    }
    return (
      <button onClick={this.handleClick}>
        { this.props.children }
      </button>);
  }
}
Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Link;
