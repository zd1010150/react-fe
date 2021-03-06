/* eslint-disable max-len,no-nested-ternary,react/forbid-prop-types,react/require-default-props,react/no-unused-state */
import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import { baseUrl } from 'config/env.config';
import { apiDomain } from 'config/env.config';
import { urlReg } from 'utils/regex';
import { MAX_UPLOAD_SIZE } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMaxSizeError: false,
      previewVisible: false,
      previewImage: '',
      fileList: this.initFileList(props.file),
    };
  }
  initFileList = (file) => {
    const fileList = [];
    if (file && file.length > 0) {
      fileList.push({
        uid: Math.random(),
        status: 'done',
        url: urlReg.test(this.props.file) ? this.props.file : `${apiDomain}/${this.props.file}`,
      });
    }
    return fileList;
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  mapFileListToFiles = fileList => fileList.map(item => item.response && item.response.data);
  handleRemove = () => {
    const { disabled } = this.props;
    if (disabled) {
      return false;
    }
  }
  handleChange = ({ fileList }) => {
    if (fileList[0] && fileList[0].status === 'uploading') {
      if (fileList[0].size > MAX_UPLOAD_SIZE) {
        this.setState({ isMaxSizeError: true });
        return;
      }
      this.setState({ isMaxSizeError: false });
    }
    this.setState({ fileList });
    const files = this.mapFileListToFiles(fileList);
    if (files && files.length > 0) {
      this.props.onChange(this.mapFileListToFiles(fileList));
    } else {
      // this.props.onChange([this.props.file]);
      this.props.onChange([]);
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{ this.props.uploadText }</div>
      </div>
    );
    const { formatMessage } = this.props.intl;
    return (
      <div className="upload-wrapper">
        <Upload
          className="uploador-wrapper"
          action={`${baseUrl}/affiliate/files`}
          listType="picture-card"
          fileList={fileList}
          onRemove={this.handleRemove}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          withCredentials
          headers={{ 'Accept-Language': window.__store__.getState().global.language }}
        >
          { this.props.disabled ? null : (this.props.pictureQuantity < 0 ? uploadButton : (this.state.fileList.length >= this.props.pictureQuantity ? null : uploadButton)) }
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        {
          this.state.isMaxSizeError ? <p className="error-msg" style={{ fontSize: '12px', lineHeight: '14px', marginBottom: '0px' }}> {formatMessage({ id: 'global.ui.upload.errorMax' })} </p> : ''
        }
        <p className="error-msg" style={{ fontSize: '12px', lineHeight: '14px', marginBottom: '0px' }}> {formatMessage({ id: 'global.ui.upload.maxSize' })} </p>
      </div>
    );
  }
}
PicturesWall.defaultProps = {
  pictureQuantity: 1, // 可以传入-1，表示可以上传无限张
  uploadText: 'Upload',
  onChange() {

  },
  file: '',
  disabled: false,
};
PicturesWall.propTypes = {
  intl: intlShape.isRequired,
  pictureQuantity: PropTypes.number,
  uploadText: PropTypes.string,
  onChange: PropTypes.func,
  file: PropTypes.string,
  disabled: PropTypes.bool,
};
export default injectIntl(PicturesWall);
