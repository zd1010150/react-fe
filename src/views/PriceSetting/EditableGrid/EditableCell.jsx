import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const EditableCell = (props) => {
  const {
    editable, value, onChange,
    ...others
  } = props;
  return (
    <div {...others}>
      {editable
        ? <Input value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
  );
};

EditableCell.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
EditableCell.defaultProps = {
  editable: false,
  value: '',
  onChange() {},
};

export default EditableCell;
