import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Steps } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import styles from '../TrackOrders.less';

const { Step } = Steps;
const cx = classNames.bind(styles);

const logisticsDetail = ({ intl, infos }) => {
  const sortedInfos = _.sortBy(infos, o => o.PositionCode);
  return (
    <Steps direction="vertical" size="small" current={sortedInfos.length - 1}>
      {
          sortedInfos.map((info) => {
            const descriptionEl = (
              <div className={cx('description-wrapper')}>
                <div className={cx('description-place')}><small>{info.Place}</small></div>
                <div className={cx('description-message')}><small>{info.Message}</small></div>
              </div>);
            return <Step title={info.DateString} description={descriptionEl} key={math.random()}/>;
          })
        }
    </Steps>
  );
};
logisticsDetail.defaultProps = {
  infos: [],
};
logisticsDetail.propTypes = {
  intl: intlShape.isRequired,
  infos: PropTypes.array,
};
export default injectIntl(logisticsDetail);
