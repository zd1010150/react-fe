import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Button } from 'antd';

const selectedUserView = ({
  intl, selectedUser, setSearchAreaVisible, searchAreaVisible,
}) => {
  const { formatMessage } = intl;
  let idFront = '';
  let idBack = '';
  if (selectedUser.document && selectedUser.document.length > 0) {
    const { name, path } = selectedUser.document[0];
    if (name === 'front_id_doc') {
      idFront = path || '';
    } else {
      idBack = path || '';
    }
    if (selectedUser.document && selectedUser.document.length > 1) {
      const { name, path } = selectedUser.document[1];
      if (name === 'front_id_doc') {
        idFront = path || '';
      } else {
        idBack = path || '';
      }
    }
  }
  return (
    <div className="block">
      <div className="block-title">
        <strong>{ formatMessage({ id: 'page.Order.selecteUser' }) }</strong>
        { searchAreaVisible ? '' : <Button onClick={() => { setSearchAreaVisible(true); }}>{ formatMessage({ id: 'page.Order.modifyAddress' }) }</Button> }
      </div>
      <div className="block-content">
        <dl>
          <dt>{ formatMessage({ id: 'global.form.name' }) }:</dt>
          <dd>{(selectedUser.first_name || '') + (selectedUser.last_name || '')}</dd>
          <dt>{ formatMessage({ id: 'global.form.phone' }) }:</dt>
          <dd>{selectedUser.phone}</dd>
          <dt>{ formatMessage({ id: 'global.form.address' }) }:</dt>
          <dd>{selectedUser.street || ''} {selectedUser.city || ''} {selectedUser.state || ''} {selectedUser.country || ''}  {selectedUser.zipCode || ''}</dd>
          <dt>{ formatMessage({ id: 'global.form.ID' }) }:</dt>
          <dd>
            { idBack.length > 0 ? <img src={idBack} alt="id back" /> : '' }
            { idFront.length > 0 ? <img src={idFront} alt="id front" /> : '' }
          </dd>
        </dl>
      </div>
    </div>
  );
};

selectedUserView.defaultProps = {
  selectedUser: {},
};
selectedUserView.propTypes = {
  intl: intlShape.isRequired,
  selectedUser: PropTypes.object,
  setSearchAreaVisible: PropTypes.func.isRequired,
  searchAreaVisible: PropTypes.bool.isRequired,
};

const SelectedUserView = injectIntl(selectedUserView);
export default SelectedUserView;
