/* eslint-disable no-script-url */
import _ from 'lodash';

export const downloadFile = file => {
  const link = document.createElement('a');
  link.id = file;
  link.setAttribute('download', null);
  link.style.display = 'none';


  document.body.appendChild(link);

  link.setAttribute('href', file);
  link.click();
debugger;
  document.body.removeChild(link);
}
export const downloadFiles = (urls) => {
  // const filePaths = _.isArray(files) ? files : [files];
  // filePaths.forEach(f => downloadFile(f));
  const link = document.createElement('a');

  link.setAttribute('download', null);
  link.style.display = 'none';

  document.body.appendChild(link);

  for (let i = 0; i < urls.length; i++) {
    link.setAttribute('href', urls[i]);
    link.click();
  }

  document.body.removeChild(link);
};


