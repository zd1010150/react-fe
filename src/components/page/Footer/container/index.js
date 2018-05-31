/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { SOURCE_URL_DOMAIN } from 'config/app.config';
import { MagentoStaticLink } from 'components/ui/index';
import { Icon, Avatar, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import styles from '../Footer.less';
import logo from 'assets/images/logo.png';
import chineseLogo from 'assets/images/chinese-affiliate.png';
import videoCover from 'assets/images/video-cover.png';
import wechatQR from 'assets/images/wechat-qr.jpg';
import weiboQR from 'assets/images/weibo-qr.png';

const cx = classNames.bind(styles);
class Footer extends React.Component {
  state={
    isPlaying: false,
  }
  togglePlay() {
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }
  render() {
    const { language, intl } = this.props;
    const videoUrl = {
      en: ' http://1256774149.vod2.myqcloud.com/1c2ac40dvodgzp1256774149/f765f8127447398156326078391/8JaruQKOazkA.mov',
      zh: 'http://1256774149.vod2.myqcloud.com/1c2ac40dvodgzp1256774149/25961df27447398156323991804/MAA4EagwCk8A.mov',
    };
    const { formatMessage } = intl;
    const footerInformation = {
      zh: [
        { id: 'global.magento.footerInformation.aboutUs', href: `${SOURCE_URL_DOMAIN}/zh/about-us.pdf` },
        { id: 'global.magento.footerInformation.returns', href: `${SOURCE_URL_DOMAIN}/zh/returns-policy.pdf` },
        { id: 'global.magento.footerInformation.delivery', href: `${SOURCE_URL_DOMAIN}/zh/shipping-policy.pdf` },
        { id: 'global.magento.footerInformation.security', href: `${SOURCE_URL_DOMAIN}/zh/security-policy.pdf` },
      ],
      en: [
        { id: 'global.magento.footerInformation.aboutUs', href: `${SOURCE_URL_DOMAIN}/en/about-us.pdf` },
        { id: 'global.magento.footerInformation.returns', href: `${SOURCE_URL_DOMAIN}/en/returns-policy.pdf` },
        { id: 'global.magento.footerInformation.delivery', href: `${SOURCE_URL_DOMAIN}/en/shipping-policy.pdf` },
        { id: 'global.magento.footerInformation.privacy', href: `${SOURCE_URL_DOMAIN}/en/privacy-policy.pdf` },
        { id: 'global.magento.footerInformation.security', href: `${SOURCE_URL_DOMAIN}/en/security-policy.pdf` },
      ],
    };

    const footerTitle = {
      followUs: 'global.magento.footerTitle.followUs',
      information: 'global.magento.footerTitle.information',
      contactUs: 'global.magento.footerTitle.contactUs',
      companyInfo: 'global.magento.footerTitle.companyInfo',
    };
    return (
      <div className={classNames('row', cx('footer-container'))}>
        <div className="col-sm-3 col-md-3">
          <img
            className={cx(`${language}-logo`)}
            src={language === 'zh' ? chineseLogo : logo}
            alt=" breakable logo"
          />
          <div className="section">
            <div className="section-title">
              <h2 className={classNames(cx('footer-title'), cx('logo-title'))}>
                {formatMessage({ id: footerTitle.followUs })}
              </h2>
            </div>
            <div className="section-content" style={{ marginLeft: '-10px' }}>
              <p>
                <Tooltip title={<img src={wechatQR} className={cx('qr-code')} />}>
                  <Avatar style={{ backgroundColor: '#4bc84b', margin: '10px' }} icon="wechat" />
                </Tooltip>
                <Tooltip title={<img src={weiboQR} className={cx('qr-code')} />}>
                  <Avatar style={{ backgroundColor: '#e94b5f', margin: '10px' }} icon="weibo" />
                </Tooltip>
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-3 col-md-3">
          <div className="section">
            <div className="section-title">
              <h2 className={cx('footer-title')}>
                {formatMessage({ id: footerTitle.information })}
              </h2>
            </div>
            <div className="section-content">
              <ul className={cx('footer-ul')}>
                {
                  footerInformation[language].map((item, index) => (
                    <li key={index}><a
                      href={item.href}
                      download
                      target="_blank"
                      className={cx('black-link')}
                    >{formatMessage({ id: item.id })}
                                    </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="col-sm-3 col-md-3">
          <div className="section">
            <div className="section-title">
              <h2 className={cx('footer-title')}>{formatMessage({ id: footerTitle.contactUs })}</h2>
            </div>
            <div className="section-content">
              <p><Icon type="home" /> UNIT 4, LEVEL 4 436-484<br/> VICTORIA RD ,GLADESVILLE, <br/> NSW 2111 AUSTRALIA</p>
              <p><Icon type="phone" /> +61 2 8188 2488</p>
              <p>
                <Icon type="mail" /> <a className={cx('black-link')} href="mailto:info@breakable.com">info@breakable.com</a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-3 col-md-3">
          <div className="section">
            <div className="section-title">
              <h2 className={cx('footer-title')}>{formatMessage({ id: footerTitle.companyInfo })}</h2>
            </div>
            <div className="section-content">
              {
                !this.state.isPlaying ?
                  (<a href="javascript:void(0)" onClick={() => { this.togglePlay(); }}><img src={videoCover} /> </a>) :
                  (<video width="212" controls autoPlay><source src={videoUrl[language]} type="video/mp4" />Your browser does not support the video tag.</video>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Footer.propTypes = {
  language: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
export default connect(mapStateToProps)(injectIntl(Footer));
