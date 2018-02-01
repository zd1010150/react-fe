import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Input } from 'antd';
import { positiveFloat } from 'utils/regex';

const EditableCell = (props) => {
  const {
    editable, value, onChange,
    ...others
  } = props;

  return (
    <div {...others}>
      {editable
        ? <Input
          value={value}
          onChange={
            (e) => {
              if (positiveFloat.test(e.target.value)) {
                onChange(e.target.value);
              }
            }
          }
          style={{ width: '50px' }}
        />
        : value
      }
      <span>%</span>
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
