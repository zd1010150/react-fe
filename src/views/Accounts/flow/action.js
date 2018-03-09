import { get, put } from 'store/http/httpAction';
import _ from 'lodash';
import { SET_ACCOUNT_DATA, SET_ID_VIEW, SET_PAGENATIONS } from './actionType';


export const setIdViewData = data => ({
  type: SET_ID_VIEW,
  idViews: data,
});
const setAccountsData = accounts => ({
  type: SET_ACCOUNT_DATA,
  accounts,
});

const setPaginations = (perPage, currentPage, total) => ({
  type: SET_PAGENATIONS,
  perPage,
  currentPage,
  total,
});
export const fetchAccounts = (perPage = 2, currentPage = 1) => dispatch => get('/affiliate/affiliated-clients', { type_id: 2, per_page: perPage, page: currentPage }, dispatch).then((data) => {
  if (data && (!_.isEmpty(data.data)) && (!_.isEmpty(data.meta))) {
    dispatch(setAccountsData(data.data));
    const pagination = data.meta.pagination;
    dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
  }
});

export const updateAccounts = (form, cb) => dispatch => put(`/affiliate/affiliated-clients/${form.id}`, { ...form }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    if (_.isFunction(cb)) cb();
    dispatch(fetchAccounts());
  }
});

