import { get, post, put } from 'src/store/http/httpAction';
import { SET_LEADS_DATA, SET_ID_VIEW, SET_PAGENATIONS } from './actionType';

export const setIdViewData = data => ({
  type: SET_ID_VIEW,
  idViews: data,
});
const setLeadsData = leads => ({
  type: SET_LEADS_DATA,
  leads,
});

const setPaginations = (perPage, currentPage, totalPages) => ({
  type: SET_PAGENATIONS,
  perPage,
  currentPage,
  totalPages,
});
export const fetchLeads = (perPage = 15, currentPage = 1) => dispatch => get('/affiliate/affiliated-clients', { type_id: 1, per_page: perPage, page: currentPage }, dispatch).then((data) => {
  console.log(data);
  dispatch(setLeadsData(data.data));
  const pagination = data.meta.pagination;
  dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total_pages));
});
export const addLeads = form => dispatch => post('/affiliate/affiliated-clients', { ...form }, dispatch).then((data) => {
  console.log(data);
  dispatch(fetchLeads());
});
export const updateLeads = form => dispatch => post(`/affiliate/affiliated-clients/${form.id}`, { ...form }, dispatch).then((data) => {
  console.log(data);
  dispatch(fetchLeads());
});

