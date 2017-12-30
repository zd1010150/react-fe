import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as globalActions from 'store/global/action';
import * as priceActions from './flow/priceActions';
import { roleGroupsSelector, finalPriceTableSelector } from './flow/reselect';
import EditableGrid from './EditableGrid';

const propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  fetchPriceTable: PropTypes.func.isRequired,
  roleGroups: PropTypes.array.isRequired,
  editingRowId: PropTypes.number.isRequired,
  priceTable: PropTypes.array.isRequired,
  toEdit: PropTypes.func.isRequired,
  changeCell: PropTypes.func.isRequired,
  saveRow: PropTypes.func.isRequired,
  cancelRow: PropTypes.func.isRequired,
};

class PriceSettingView extends React.Component {
  componentDidMount() {
    const { setPageTitle, fetchPriceTable } = this.props;
    setPageTitle('global.pageTitle.priceSetting');
    fetchPriceTable();
  }
  render() {
    const {
      roleGroups, priceTable, editingRowId, toEdit, changeCell, saveRow, cancelRow,
    } = this.props;
    return (
      <div>
        <EditableGrid
          roleGroups={roleGroups}
          priceTable={priceTable}
          editingRowId={editingRowId}
          toEdit={toEdit}
          changeCell={changeCell}
          saveRow={saveRow}
          cancelRow={cancelRow}
        />
      </div>
    );
  }
}
PriceSettingView.propTypes = propTypes;

const mapDispatchToProp = {
  ...priceActions,
  setPageTitle: globalActions.setPageTitle,
};
const mapState = (state) => {
  console.log('priceTable', finalPriceTableSelector(state));
  return {
    editingRowId: state.price.editingRowId,
    roleGroups: roleGroupsSelector(state),
    priceTable: finalPriceTableSelector(state),
  };
};

export default connect(mapState, mapDispatchToProp)(PriceSettingView);
