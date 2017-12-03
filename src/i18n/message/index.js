import _ from 'lodash';
import ui from './ui';
import pageTitle from './pageTitle';

const root = { ui, pageTitle };

const deconstructionObj = (obj) => {
  const result = {};
  const traverseObj = (rootKey, root) => {
    for (let key of Object.keys(root)) {
      if (!_.isObject(root[key])) {
        result[`${rootKey}.${key}`.slice(1)] = root[key];
      } else {
        traverseObj(`${rootKey}.${key}`, root[key]);
      }
    }
  };
  traverseObj('', obj);
  return result;
};
const deconstructLanguage = (root, language) => {
  const result = {};
  for (let key of Object.keys(root)) {
    result[key] = root[key][language];
  }
  return deconstructionObj(result);
};

export default {
  zh: deconstructLanguage(root, 'zh'),
  en: deconstructLanguage(root, 'en')
};
