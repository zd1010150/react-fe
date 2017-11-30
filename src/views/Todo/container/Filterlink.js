import Link from '../Link'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../../../action'

const mapStateToProps = (state,ownProps)=>{
    return {
        active : state.visibilityFilter == ownProps.filter
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