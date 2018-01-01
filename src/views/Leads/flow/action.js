import { get, post, put, httpDelete } from 'store/http/httpAction';
import { SET_LEADS_DATA, SET_ID_VIEW, SET_PAGENATIONS } from './actionType';

export const setIdViewData = data => ({
  type: SET_ID_VIEW,
  idViews: data,
});
const setLeadsData = leads => ({
  type: SET_LEADS_DATA,
  leads,
});

const setPaginations = (perPage, currentPage, total) => ({
  type: SET_PAGENATIONS,
  perPage,
  currentPage,
  total,
});
export const fetchLeads = (perPage = 3, currentPage = 1) => {
  console.log(perPage, currentPage, 'action');
  return dispatch => get('/affiliate/affiliated-clients', {
    type_id: 1,
    per_page: perPage,
    page: currentPage,
  }, dispatch).then((data) => {
    dispatch(setLeadsData(data.data));
    const { pagination } = data.meta;
    dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
  });
};
export const addLeads = form => dispatch => post('/affiliate/affiliated-clients', { ...form }, dispatch).then((data) => {
  console.log(data);
  dispatch(fetchLeads());
});
export const updateLeads = form => dispatch => put(`/affiliate/affiliated-clients/${form.id}`, { ...form }, dispatch).then((data) => {
  dispatch(fetchLeads());
});

export const deleteLeads = id => dispatch => httpDelete(`/affiliate/affiliated-clients/${id}`, {}, dispatch).then((data) => {
  dispatch(fetchLeads());
});

