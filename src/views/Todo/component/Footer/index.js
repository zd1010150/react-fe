/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import FilterLink from '../../container/Filterlink';
import styles from './footer.less';

const cx = classNames.bind(styles);

const Footer = ({ intl }) => {
  const { formatMessage } = intl;
  return (<p className={cx('footer', 'text-danger')}>
    Show:
    {' '}
    <FilterLink filter="SHOW_ALL">
      { formatMessage({ id: 'page.Todo.all' }) }
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">
      { formatMessage({ id: 'page.Todo.active' }) }
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">
      { formatMessage({ id: 'page.Todo.completed' }) }
    </FilterLink>
  </p>);
};
Footer.propTypes = {
  intl: intlShape.isRequired,
};
export default injectIntl(Footer);
