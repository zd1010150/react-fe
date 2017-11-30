

import ErrorComponent from '../component/error'
import { connect } from 'react-redux'

const mapStateToProps = (state)=>{
    return {
        errors : state.httpErrors
    }
}

const errorView = connect(mapStateToProps,null)(ErrorComponent)
export default errorView