import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input } from 'antd';

const numberRegx = /^\d$/g;
class InputNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.value,
      min: this.props.min,
      max: this.props.max,
    };
    this.handleExtraError(this.state.min, this.state.max);
  }
  componentWillReceiveProps(nextProps) {
    const { min, max, value } = nextProps;
    this.handleExtraError(min, max);
    if (value >= min && value <= max) {
      this.setState({
        inputValue: value,
        min,
        max,
      });
    }
  }
  handleExtraError(min, max) {
    if (min > max) {
      throw Error('input number min is bigger than max!');
    }
  }
  plus() {
    let newValue = this.state.inputValue + 1;
    newValue = newValue > this.state.max ? this.state.max : newValue;
    this.setState({
      inputValue: newValue,
    });
    this.props.onChange(newValue);
  }
  minus() {
    let newValue = this.state.inputValue - 1;
    newValue = newValue < this.props.min ? this.state.min : newValue;
    this.setState({
      inputValue: newValue,
    });
    this.props.onChange(newValue);
  }
  handleChange(event) {
    debugger;
    console.log('change handler triggered', event.target.value);
    const value = event.target.value;
    if (numberRegx.test(value)) {
      if (value >= this.state.min && value <= this.state.max) {
        this.setState({
          inputValue: value,
        });
        this.props.onChange(value);
      }
    }else{
      this.setState({
        inputValue: this.state.inputValue
      })
    }

  }
  render() {
    return (
      <span>
        <Icon type="minus" onClick={() => { this.minus(); }} />
        <Input size="small" defaultValue={this.props.defaultValue} value={this.state.inputValue} onInput={this.handleChange} onChange={this.handleChange} />
        <Icon type="plus" onClick={() => { this.plus(); }} />
      </span>
    );
  }
}

InputNumber.defaultProps = {
  min: 0,
  max: 0,
  value: 0,
  defaultValue: 0,
  onChange() {

  },
};
InputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};
export default InputNumber;
