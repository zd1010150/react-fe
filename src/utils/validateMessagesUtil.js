import formField from 'src/i18n/global/form';

const MSG = {
  zh: {
    default: 'Validation error on field %s',
    required: '%s 是必须的',
    enum: '%s 必须是 %s 中的一种',
    whitespace: '%s 不能为空',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid',
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s 不合法',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s',
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters',
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s',
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length',
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s',
    },
    clone() {
      const cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    },
  },
  en: {
    default: 'Validation error on field %s',
    required: '%s is required',
    enum: '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid',
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s',
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters',
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s',
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length',
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s',
    },
    clone() {
      const cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    },
  },
};
const zhMessages = {
  after: (field, [target]) => ` ${field}必须在${target}之后`,
  alpha_dash: (field) => ` ${field}能够包含字母数字字符，包括破折号、下划线`,
  alpha_num: (field) => `${field} 只能包含字母数字字符.`,
  alpha_spaces: (field) => ` ${field} 只能包含字母字符，包括空格.`,
  alpha: (field) => ` ${field} 只能包含字母字符.`,
  before: (field, [target]) => ` ${field} 必须在${target} 之前.`,
  between: (field, [min, max]) => ` ${field} 必须在${min} ${max}之间.`,
  confirmed: (field, [confirmedField]) => ` ${field} 不能和${confirmedField}匹配.`,
  date_between: (field, [min, max]) => ` ${field}必须在${min}和${max}之间.`,
  date_format: (field, [format]) => ` ${field}必须在在${format}格式中.`,
  decimal: (field, [decimals] = ['*']) => ` ${field} 必须是数字的而且能够包含${decimals === '*' ? '' : decimals} 小数点.`,
  digits: (field, [length]) => ` ${field} 必须是数字，且精确到 ${length}数`,
  dimensions: (field, [width, height]) => ` ${field}必须是 ${width} 像素到 ${height} 像素.`,
  email: (field) => ` ${field} 必须是有效的邮箱.`,
  ext: (field) => ` ${field} 必须是有效的文件.`,
  image: (field) => ` ${field} 必须是图片.`,
  in: (field) => ` ${field} 必须是一个有效值.`,
  ip: (field) => ` ${field} 必须是一个有效的地址.`,
  max: (field, [length]) => ` ${field} 不能大于${length}字符.`,
  mimes: (field) => ` ${field} 必须是有效的文件类型.`,
  min: (field, [length]) => ` ${field} 必须至少有 ${length} 字符.`,
  not_in: (field) => ` ${field}必须是一个有效值.`,
  numeric: (field) => ` ${field} 只能包含数字字符.`,
  regex: (field) => ` ${field}格式无效.`,
  required: (field) => `${field}是必须的.`,
  size: (field, [size]) => ` ${field} 必须小于 ${size} KB.`,
  url: (field) => ` ${field}不是有效的url.`
};
const enMessage = {
  required: (field) => `${field} is required.`,
}
const getMsgByLanguage = (language) => {
  return MSG[language];
};
// const getRules = (language = 'zh', filedKey= '', rules) = {
//   const rules
// }
export default getMsgByLanguage;
