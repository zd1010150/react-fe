import { connect } from 'react-redux';
import Link from '../component/Link';

import { setVisibilityFilter } from '../flow/action';

const mapStateToProps = ({ todo }, ownProps) => ({
  active: todo.visibilityFilter === ownProps.filter,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  handleClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});
const Filterlink = connect(mapStateToProps, mapDispatchToProps)(Link);
export default Filterlink;
