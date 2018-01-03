/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

const FormItem = Form.Item;
const { Option } = Select;

const searchForm = ({
  intl, onSubmit, form, deliveryOrderStatus, defaultStatus,
}) => {
  const { getFieldDecorator } = form;
  const { formatMessage } = intl;
  const statusSelect = getFieldDecorator('status', { initialValue: defaultStatus })(<Select>
    <Option value={-1}>{formatMessage({ id: 'global.ui.select.all' }) }</Option>
    {deliveryOrderStatus.map(item => <Option value={item.id} key={item}>{item.name}</Option>)}
  </Select>);
  return (
    <Form
      layout="inline"
      onSubmit={() => {
      onSubmit({ ...form.getFieldsValue() });
    }}
    >
      <FormItem label={formatMessage({ id: 'global.form.status' })}>
        { statusSelect }
      </FormItem>
      <FormItem
        label={formatMessage({ id: 'global.form.receiver' })}
      >
        {getFieldDecorator('name')(<Input />)}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
        >
          { formatMessage({ id: 'global.ui.button.search' })}
        </Button>
      </FormItem>
    </Form>
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
