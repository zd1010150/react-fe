import React from 'react'
import PropTypes from 'prop-types'

export default class Errors extends React.Component{
    render() {
        return (
            <ul>
                {this.props.errors.map((err)=>{
                    return (<li> msg : {err.toString()} | url : {err.url} | date: {err.date}</li>)
                })}
            </ul>
        )
    }
}
Errors.propTypes = {
   errors:PropTypes.array.isRequired
}
