
import { notification } from 'antd';
import { markReadedError } from 'src/store/global/action';

const errorNotification = (store) => {
  store.subscribe(() => {
    const unReadErrors = store.getState().global.errors.filter(item => !item.readed);
    unReadErrors.forEach((item) => {
      notification.error({
        message: item.msg,
        key: item.id,
      });
      store.dispatch(markReadedError(item.id));
    });
  });
};

export default errorNotification;

