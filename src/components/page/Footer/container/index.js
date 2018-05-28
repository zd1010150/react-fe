import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MagentoStaticLink } from 'components/ui/index';
import { Icon, Avatar, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import styles from '../Footer.less';
import logo from 'assets/images/logo.png';
import chineseLogo from 'assets/images/chinese-affiliate.png';
import wechatQR from 'assets/images/wechat-qr.jpg';
import weiboQR from 'assets/images/weibo-qr.png';

const cx = classNames.bind(styles);
const Footer = ({ language }) => {
  const footerImformation = [
    { id: 'global.magento.footerInformation.return', href: '/return' },
    { id: 'global.magento.footerInformation.delivery', href: '/delivery' },
  ];
  const footerOurOffers = [
    { id: 'global.magento.footerOurOffers.newProduct', href: '/newProduct' },
    { id: 'global.magento.footerOurOffers.topSeller', href: '/topSeller' },
    { id: 'global.magento.footerOurOffers.special', href: '/special' },
  ];
  return (
    <div className={classNames('row', cx('footer-container'))}>
      <div className="col-sm-3 col-md-3">
        <img className={cx(`${language}-logo`)} src={language === 'zh' ? chineseLogo : logo} alt=" breakable logo" />
        <div className="section">
          <div className="section-title">
           Follow US
          </div>
          <div className="section-content">
            <p>
              <Tooltip title={<img src={wechatQR} className={cx('qr-code')} />}>
                <Avatar style={{ backgroundColor: '#4bc84b', margin: '10px' }} icon="wechat" />
              </Tooltip>
              <Tooltip title={<img src={weiboQR} className={cx('qr-code')} />}>
                <Avatar style={{ backgroundColor: '#e94b5f',margin: '10px' }} icon="weibo" />
              </Tooltip>
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-3 col-md-3">
        <div className="section">
          <div className="section-title">
            <h2 className={cx('footer-title')}>Information</h2>
          </div>
          <div className="section-content">
            <ul className={cx('footer-ul')}>
              {
                footerImformation.map((item, index) => (
                  <li key={index}><MagentoStaticLink href={item.href} titleId={item.id} /></li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="col-sm-3 col-md-3">
        <div className="section">
          <div className="section-title">
            <h2 className={cx('footer-title')}>Information</h2>
          </div>
          <div className="section-content">
            <ul className={cx('footer-ul')}>
              {
                footerOurOffers.map((item, index) => (
                  <li key={index}><MagentoStaticLink href={item.href} titleId={item.id} /></li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="col-sm-3 col-md-3">
        <div className="section">
          <div className="section-title">
            <h2 className={cx('footer-title')}>Get in touch</h2>
          </div>
          <div className="section-content">
            <p><Icon type="home" /> Unit 4, Level 4 436-484 Victoria Road Gladesville NSW 2111</p>
            <p> <Icon type="phone" /> +61 2 8188 2488</p>
            <p>
              <Icon type="mail" /> <a href="mailto:info@breakable.com">info@breakable.com</a>
            </p>
            <p />
          </div>
        </div>

      </div>
    </div>
  );
};
Footer.propTypes = {
  language: PropTypes.string.isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
export default connect(mapStateToProps)(Footer);
