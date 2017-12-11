/* eslint-disable max-len,no-nested-ternary */
import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{ this.props.uploadText }</div>
      </div>
    );
    return (
      <div style={{ display:'inline-block' }}>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          { this.props.pictureQuantity < 0 ? uploadButton : (this.state.fileList.length >= this.props.pictureQuantity ? null : uploadButton) }
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
  onchange() {

  },
};
PicturesWall.propTypes = {
  pictureQuantity: PropTypes.number,
  uploadText: PropTypes.string,
  onchange: PropTypes.func,
};
export default PicturesWall;
