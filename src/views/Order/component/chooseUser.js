import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';

class chooseUser extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div> this is ChooseUser</div>
    );
  }
}


chooseUser.propTypes = {
  intl: intlShape.isRequired,
};
const ChooseUser = injectIntl(chooseUser);
export default ChooseUser;
