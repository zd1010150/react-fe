import React from 'react';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';


const Nav = ({ intl }) => {
  const { formatMessage } = intl;
  const hello =   formatMessage({ id: 'ui.button.cancel' })
  return (<ul>
    <li>
      <Link to="/about">About{ hello }</Link>
    </li>
    <li>
      <Link to="/game">Game</Link>
    </li>
    <li>
      <Link to="/todo">Todo</Link>
    </li>
    <li>
      <Link to="/inbox">Inbox</Link>
    </li></ul>);
};
Nav.propTypes = {
  intl: intlShape.isRequired,
};
export default injectIntl(Nav);
