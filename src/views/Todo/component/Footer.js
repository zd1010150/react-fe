/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import FilterLink from '../container/Filterlink';


const Footer = ({ intl }) => {
  const { formatMessage } = intl;
  return (<p>
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
