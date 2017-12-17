import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Table } from 'antd';
import { roleGroups } from '../flow/constants';
import EditableCell from './EditableCell';
import styles from './EditableGrid.less';

const cx = classNames.bind(styles);

const propTypes = {
  priceTable: PropTypes.array.isRequired,
  toEdit: PropTypes.func.isRequired,
  changeCell: PropTypes.func.isRequired,
  saveRow: PropTypes.func.isRequired,
  cancelRow: PropTypes.func.isRequired,
};
const defaultProps = {
};
class EditableGrid extends Component {
  constructor() {
    super();
    this.state = {};
    this.buildColumns();
  }
  buildColumns() {
    const columns = roleGroups.map(column => ({
      ...column,
      key: column.id,
      title: column.name,
      render: (text, record) => this.renderColumns(text, record, column),
    }));
    columns.unshift({
      title: '',
      key: '',
      dataIndex: 'name',
      render: name => (<div className={cx('category-title')}>{name}</div>),
    });
    columns.push({
      title: 'Action',
      key: 'action',
      width: 120,
      render: (text, record) => {
        const { editable } = record;
        const { toEdit, saveRow, cancelRow } = this.props;
        return (
          <div className="editable-row-actions">
            {
              editable ?
                <span>
                  <a onClick={() => saveRow(record.id)}>Save </a>
                  <a onClick={() => cancelRow(record.id)}>Cancel</a>
                </span>
                : <a onClick={() => toEdit(record.id)}>Edit</a>
            }
          </div>
        );
      },
    });
    this.columns = columns;
  }
  renderColumns(text, record, column) {
    const { changeCell } = this.props;
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        className={cx('cell')}
        onChange={value => changeCell(value, record.id, column.dataIndex)}
      />
    );
  }
  render() {
    const { priceTable } = this.props;
    return (
      <Table className={cx('editable-grid')} rowKey="id" columns={this.columns} dataSource={priceTable} />
    );
  }
}

EditableGrid.propTypes = propTypes;
EditableGrid.defaultProps = defaultProps;

export default EditableGrid;
