import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AU_CODE, CHINESE_CODE, CHINA_CODE } from 'config/app.config';

const address = ({
  language, country, countries, street, city, state, zipCode, provinces,
}) => {
  const countryObj = countries.filter(c => c.code === country);
  const countryName = _.isEmpty(countryObj) ? '' : countryObj[0].name;
  let innerState = state;
  let innerCity = city;
  if (country === CHINA_CODE) {
    const filteredProvince = provinces.filter(p => Number(p.id) === Number(state));
    if (_.isEmpty(filteredProvince)) {
      innerState = '';
      innerCity = '';
    } else {
      innerState = filteredProvince[0].name;
      const filteredCity = filteredProvince[0].cities.filter(c => Number(c.id) === Number(city));
      if (_.isEmpty(filteredCity)) {
        innerCity = '';
      } else {
        innerCity = filteredCity[0].name;
      }
    }
  } else if (country === AU_CODE) {
    const filteredProvince = provinces.filter(p => Number(p.id) === Number(state));
    if (_.isEmpty(filteredProvince)) {
      innerState = '';
    } else {
      innerState = filteredProvince[0].name;
    }
  }
  if (language === CHINESE_CODE) {
    return <span>{countryName}{innerState}{innerCity}{street} {zipCode}</span>;
  }
  return <span>{street} {innerCity} {innerState} {countryName} {zipCode}</span>;
};
address.defaultProps = {
  country: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  countries: [],
  language: CHINESE_CODE,
  provinces: [],
};
address.propTypes = {
  country: PropTypes.string,
  street: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  countries: PropTypes.array,
  language: PropTypes.string,
  provinces: PropTypes.array,
};

const mapStateToProps = ({ global, ui }) => ({
  countries: global.settings.countries,
  language: global.language,
  provinces: global.provinces,
});

export default connect(mapStateToProps)(address);
