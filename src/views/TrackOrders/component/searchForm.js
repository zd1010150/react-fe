/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

const FormItem = Form.Item;
const { Option } = Select;

const searchForm = ({
  intl, onSubmit, form, deliveryOrderStatus
}) => {
  const { getFieldDecorator } = form;
  const { formatMessage } = intl;
  return (
    <Form layout="inline" onSubmit={onSubmit}>
      <FormItem label={formatMessage({ id: 'pages.TrackOrders.status' })}>

        <Select defaultValue="lucy" style={{ width: 120 }}>
          {
            deliveryOrderStatus.map((item)=>(<Option value={item}></Option>)
          }
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>Disabled</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>

      </FormItem>
      <FormItem
        label={formatMessage({ id: 'pages.TrackOrders.receiveName' })}
      >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(<Input type="password" placeholder="Password" />)}
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
