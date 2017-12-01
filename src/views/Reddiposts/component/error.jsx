
import React from 'react';
import PropTypes from 'prop-types';

const Errors = ({ errors }) => (
  <ul>
    {
          errors.map(err => (
            <li> msg : {err.toString()} | url : {err.url} | date: {err.date}</li>))
        }
  </ul>
);
Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    errors: PropTypes.object,
    date: PropTypes.instanceOf(Date),
  })).isRequired,
};
export default Errors;
