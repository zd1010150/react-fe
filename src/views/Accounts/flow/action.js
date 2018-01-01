import { get, post, put } from 'store/http/httpAction';
import { SET_ACCOUNT_DATA, SET_ID_VIEW, SET_PAGENATIONS } from './actionType';

export const setIdViewData = data => ({
  type: SET_ID_VIEW,
  idViews: data,
});
const setAccountsData = accounts => ({
  type: SET_ACCOUNT_DATA,
  accounts,
});

const setPaginations = (perPage, currentPage, totalPages) => ({
  type: SET_PAGENATIONS,
  perPage,
  currentPage,
  totalPages,
});
export const fetchAccount = (perPage = 15, currentPage = 1) => dispatch => get('/affiliate/affiliated-clients', { type_id: 2, per_page: perPage, page: currentPage }, dispatch).then((data) => {
  console.log(data);
  dispatch(setAccountsData(data.data));
  const pagination = data.meta.pagination;
  dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total_pages));
});

export const updateAccount = form => dispatch => put(`/affiliate/affiliated-clients/${form.id}`, { ...form }, dispatch).then((data) => {
  console.log(data);
  dispatch(fetchAccount());
});

