/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

import classNames from 'classnames/bind';
import styles from '../TrackOrders.less';

const FormItem = Form.Item;
const { Option } = Select;
const cx = classNames.bind(styles);

const searchForm = ({
  intl, onSubmit, form, deliveryOrderStatus, defaultStatus,
}) => {
  const { getFieldDecorator } = form;
  const { formatMessage } = intl;
  const statusSelect = getFieldDecorator('status', { initialValue: defaultStatus })(<Select className={cx('status-select')}>
    <Option value={-1}>{formatMessage({ id: 'global.ui.select.all' }) }</Option>
    {deliveryOrderStatus.map(item => <Option value={item.id} key={item}>{item.name}</Option>)}
  </Select>);
  return (
    <div>
      <Form
        layout="inline"
        className={cx('search-form')}
      >
        <FormItem label={formatMessage({ id: 'global.form.status' })}>
          { statusSelect }
        </FormItem>
        <FormItem
          label={formatMessage({ id: 'global.form.receiver' })}
        >
          {getFieldDecorator('name')(<Input />)}
        </FormItem>

      </Form>
      <Button
        type="primary"
        className={cx('search-form-btn')}
        onClick={() => {
          onSubmit({ ...form.getFieldsValue() });
        }}
      >
        { formatMessage({ id: 'global.ui.button.search' })}
      </Button>
    </div>
  );
};
searchForm.defaultProps = {
  defaultStatus: -1,
};
searchForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultStatus: PropTypes.number,
};

export default Form.create()(injectIntl(searchForm));
