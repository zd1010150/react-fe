/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

const FormItem = Form.Item;
const { Option } = Select;

const searchForm = ({
  intl, onSubmit, form, deliveryOrderStatus,
}) => {
  const { getFieldDecorator } = form;
  const { formatMessage } = intl;
  const statusSelect = getFieldDecorator('status', { initialValue: 'all' })(<Select>{deliveryOrderStatus.map(item => <Option value={item} key={item}>{item}</Option>)}</Select>);
  return (
    <Form layout="inline" onSubmit={onSubmit(...form.getFieldsValue())}>
      <FormItem label={formatMessage({ id: 'pages.TrackOrders.status' })}>
        { statusSelect }
      </FormItem>
      <FormItem
        label={formatMessage({ id: 'pages.TrackOrders.receiveName' })}
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

searchForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form.create()(injectIntl(searchForm));
