/* eslint-disable max-len,no-nested-ternary,react/forbid-prop-types,react/require-default-props,react/no-unused-state */
import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import { baseUrl } from 'src/config/env.config';
import Cookie from 'js-cookie';

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    const fileList = [];
    if (this.props.file && this.props.file.length > 0) {
      fileList.push({
        uid: Math.random(),
        status: 'done',
        url: this.props.file,
      });
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList,
    };
  }

  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  mapFileListToFiles = fileList => fileList.map((item) => {
    return item.response && item.response.data;
  });
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    this.props.onChange(this.mapFileListToFiles(fileList));
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const headers = {
      Authorization: `Bearer ${Cookie.get('token')}`,
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{ this.props.uploadText }</div>
      </div>
    );
    return (
      <div style={{ display: 'inline-block' }}>
        <Upload
          action={`${baseUrl}/affiliate/files`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          headers={headers}
        >
          { this.props.disabled ? null : (this.props.pictureQuantity < 0 ? uploadButton : (this.state.fileList.length >= this.props.pictureQuantity ? null : uploadButton)) }
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
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
  pictureQuantity: PropTypes.number,
  uploadText: PropTypes.string,
  onChange: PropTypes.func,
  file: PropTypes.string,
  disabled: PropTypes.bool,
};
export default PicturesWall;
