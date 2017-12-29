import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Icon, Input } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { Upload } from 'src/components/ui/index';


class id extends React.Component {
  state = {
    orginal: {
      idFront: this.props.idFront,
      idBack: this.props.idBack,
    },
    errorMsg: '',
    idFront: this.props.idFront,
    idBack: this.props.idFront,
    key: Math.random(), // 为了让upload重新渲染
  };
  handleSubmit() {
    const { onOk } = this.props;

    if (this.state.orginal.idFront === this.state.idFront && this.state.orginal.idBack === this.state.idBack) {
      this.setState({
        errorMsg: '你没有上传任何新的文件!',
      });
    } else { onOk(this.state.idFront, this.state.idBack); }
  }
  componentWillReceiveProps(nextProps) {
    const orginal = Object.assign({}, this.state.orginal, {
      idFront: nextProps.idFront,
      idBack: nextProps.idBack,
    });
    this.setState({
      idFront: nextProps.idFront,
      idBack: nextProps.idBack,
      errorMsg: '',
      orginal,
      key: Math.random(), // 为了让upload重新渲染
    });
  }
  render() {
    const {
      intl, visible, userId, idFront, idBack, onCancel, rejectReseason, allRejectReasons,
    } = this.props;
    const { formatMessage } = intl;
    const getRejectReason = () => {
      const reason = allRejectReasons.filter(item => (Number(item.id) === rejectReseason));
      if (reason && reason.length > 0) {
        return (<div className="col-md-12 col-sm-12 text-danger text-center" ><Icon type="warning" />{ reason[0].name }</div>);
      } return null;
    };
    return (
      <Modal
        title={formatMessage({ id: 'page.Leads.editId' })}
        visible={visible}
        onOk={() => this.handleSubmit()}
        onCancel={() => onCancel()}
      >
        <div className="row">
          {getRejectReason()}
          <div className="col-md-12 col-sm-12 text-danger text-center" >{this.state.errorMsg}</div>
          <div className="col-md-12 col-sm-12 text-danger text-center" >
            <p>身份证号码：<Input placeholder="input the id number /" /></p>
          </div>
          <div className="col-md-6 col-sm-6" style={{ textAlign: 'center' }}>
            <p className="text-center">{formatMessage({ id: 'global.form.idFront' })}</p>
            <Upload
              key={this.state.key}
              pictureQuantity={1}
              uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })}
              file={idFront}
              onChange={fileList => this.setState({ idFront: fileList && fileList.length > 0 && fileList[0] })}
            />
          </div>
          <div className="col-md-6 col-sm-6" style={{ textAlign: 'center' }}>
            <p className="text-center">{formatMessage({ id: 'global.form.idBack' })}</p>
            <Upload
              key={this.state.key}
              pictureQuantity={1}
              uploadText={formatMessage({ id: 'page.Leads.uploadIDBack' })}
              file={idBack}
              onChange={fileList => this.setState({ idBack: fileList && fileList.length > 0 && fileList[0] })}
            />
          </div>
        </div>
      </Modal>
    );
  }
}


id.defaultProps = {
  visible: false,
  userId: '',
  idFront: '',
  idBack: '',
  rejectReseason: 0,
  allRejectReasons: []
};
id.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool,
  userId: PropTypes.string,
  idFront: PropTypes.string,
  idBack: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  rejectReseason: PropTypes.number,
  allRejectReasons: PropTypes.array,
};
const mapStateToProps = ({ global }) => ({
  allRejectReasons: global.settings.reject_reasons,
});
const ID = connect(mapStateToProps)(injectIntl(id));
export default ID;
