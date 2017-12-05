import React from 'react';
import PropTypes from 'prop-types';

const Language = ({ language, onChange }) =>
  (<select onChange={(e) => { onChange(e.target.value); }} value={language}>
    <option value="zh"> 中文</option>
    <option value="en"> english</option>
  </select>
  );
Language.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Language;
