/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { getAbsolutePath } from 'src/config/magento.config';

const { Search } = Input;

class searchView extends React.Component {
  state = {
    keyWords: '',
  }
  search = (keyWords) => {
    this.setState = {
      keyWords,
    };
    window.forms.searchForm.submit();
  }
  render() {
    const placeHolder = this.props.intl.formatMessage({ id: 'global.ui.input.searchStore' });
    return (
      <div data-role="search">
        <form method="get" action={getAbsolutePath('/catalogsearch/result', this.props.language)} name="searchForm">
          <input type="hidden" name="q" value={this.state.keyWords} />
        </form>
        <Search
          placeholder={placeHolder}
          onSearch={value => this.search(value)}
          style={{ width: 250 }}
        />
      </div>
    );
  }
}
searchView.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
};

const SearchView = injectIntl(searchView);


export default SearchView;
