/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { apiDomain } from 'config/env.config';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Modal, Icon } from 'antd';
import classNames from 'classnames/bind';
import { Address, Username } from 'components/ui/index';
import styles from '../../Order.less';
import { urlReg } from 'utils/regex';

const cx = classNames.bind(styles);
class selectedUserView extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
  }
  handleClosePreviewDialog() {
    this.setState({
      previewVisible: false,
    });
  }
  openPreviewDialog(src) {
    this.setState({
      previewVisible: true,
      previewImage: src,
    });
  }
  render() {
    const {
      intl, selectedUser, setSearchAreaVisible, searchAreaVisible,
    } = this.props;
    const { formatMessage } = intl;

    const mapPath = {};
    selectedUser.document.forEach((r) => {
      mapPath[r.name] = r.path;
    });
    const idFront = mapPath.front_id_doc || '';
    const idBack = mapPath.back_id_doc || '';
    return (
      <div className={classNames('block', cx('choose-user-search'))}>
        <div className={classNames(cx('tab-block-title'), 'block-title')}>
          <strong>{ formatMessage({ id: 'page.Order.selecteUser' }) }</strong>
          { searchAreaVisible ? '' : <Button className="icon-btn" onClick={() => { setSearchAreaVisible(true); }}><Icon type="edit" /></Button> }
        </div>
        <div className="block-content">
          <table className={cx('selected-user-info-table')}>
            <tbody>
              <tr>
                <td className={cx('selected-user-info-table-title')}>{ formatMessage({ id: 'global.form.name' }) }:</td>
                <td className={cx('selected-user-info-table-info')}>
                  <Username firstName={selectedUser.first_name} lastName={selectedUser.last_name} />
                </td>
                <td className={cx('selected-user-info-table-title')}>{ formatMessage({ id: 'global.form.phone' }) }:</td>
                <td className={cx('selected-user-info-table-info')}>{selectedUser.phone}</td>
              </tr>
              <tr>
                <td className={cx('selected-user-info-table-title')}>{ formatMessage({ id: 'global.form.address' }) }:</td>
                <td className={cx('selected-user-info-table-info')}>
                  <Address street={selectedUser.street} city={selectedUser.city} state={selectedUser.state} country={selectedUser.country} zipCode={selectedUser.zip_code} />
                </td>
                <td className={cx('selected-user-info-table-title')}>{ formatMessage({ id: 'global.form.IDDoc' }) }:</td>
                <td className={cx('selected-user-info-table-info')}>
                  <span>{selectedUser.id_number}</span>
                  { idFront.length > 0 ? <img
                    src={urlReg.test(idFront) ? idFront : `${apiDomain}/${idFront}`}
                    alt="id front"
                    className={cx('id-thumbnail')}
                    onClick={() => { this.openPreviewDialog(urlReg.test(idFront) ? idFront : `${apiDomain}/${idFront}`); }}
                  /> : '' }
                  { idBack.length > 0 ? <img
                    src={urlReg.test(idBack) ? idBack : `${apiDomain}/${idBack}`}
                    alt="id back"
                    className={cx('id-thumbnail')}
                    onClick={() => { this.openPreviewDialog(urlReg.test(idBack) ? idBack : `${apiDomain}/${idBack}`); }}
                  /> : '' }

                </td>
              </tr>

            </tbody>
          </table>


          <Modal
            visible={this.state.previewVisible}
            footer={null}
            onCancel={() => this.handleClosePreviewDialog()}
          >
            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
          </Modal>

        </div>
      </div>
    );
  }
}

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
