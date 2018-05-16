import React, { Component } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Table } from 'antd';
import EditableCell from './EditableCell';
import styles from './EditableGrid.less';

const cx = classNames.bind(styles);

const propTypes = {
  roleGroups: PropTypes.array.isRequired,
  priceTable: PropTypes.array.isRequired,
  editingRowId: PropTypes.number.isRequired,
  toEdit: PropTypes.func.isRequired,
  changeCell: PropTypes.func.isRequired,
  saveRow: PropTypes.func.isRequired,
  cancelRow: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};
const defaultProps = {
};
class EditableGrid extends Component {
  buildColumns() {
    const { roleGroups, intl } = this.props;
    const { formatMessage } = intl;
    const columns = roleGroups.map(column => ({
      ...column,
      key: column.id,
      title: column.name,
      dataIndex: column.name,
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
        const {
          toEdit, saveRow, cancelRow, editingRowId,
        } = this.props;
        return (
          <div className="editable-row-actions">
            {
              record.id === editingRowId ?
                <span>
                  <a onClick={() => saveRow(record.id)}>{ formatMessage({ id: 'global.ui.button.save' }) } </a>
                  <a onClick={() => cancelRow(record.id)}>{ formatMessage({ id: 'global.ui.button.cancel' }) }</a>
                </span>
                : <a onClick={() => toEdit(record.id)}>{ formatMessage({ id: 'global.ui.button.edit' }) }</a>
            }
          </div>
        );
      },
    });
    return columns;
  }
  renderColumns(text, record, column) {
    const { changeCell, editingRowId } = this.props;
    return (
      <EditableCell
        editable={record.id === editingRowId}
        value={text}
        className={cx('cell')}
        onChange={value => changeCell(value, record.id, column.id)}
      />
    );
  }
  render() {
    const { priceTable } = this.props;
    const columns = this.buildColumns();
    return (
      <Table className="editable-grid" rowKey="id" pagination={false} columns={columns} dataSource={priceTable} />
    );
  }
}

EditableGrid.propTypes = propTypes;
EditableGrid.defaultProps = defaultProps;

export default injectIntl(EditableGrid);
