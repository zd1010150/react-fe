import Link from '../component/Link'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../flow/action'

const mapStateToProps = ({ todo },ownProps)=>{
    return {
        active : todo.visibilityFilter == ownProps.filter
    }
}
const mapDispatchToProps = (dispatch,ownProps) =>{
    return {
        handleClick : ()=>{
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}
const Filterlink = connect(mapStateToProps,mapDispatchToProps)(Link)
export default Filterlink
