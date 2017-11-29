import React from 'react'


export default class Message extends React.Component{
    constructor(props){
        super(props)
        console.log("constructor",new Date(),this.props.match)
    }
    componentDidMount() {
        console.log("didmonut",new Date(),this.props.match)
    }

    componentWillUnmount() {
        console.log("willunmonut",new Date(),this.props.match)
    }
    render(){
        return (
            <h1>message{ this.props.match.params.id }</h1>
        )
    }
}
