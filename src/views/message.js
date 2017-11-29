import React from 'react'


export default class Message extends React.Component{
    constructor(props){
        super(props)
        console.log("constructor",new Date(),this.props.match,this.props.location)
    }
    componentDidMount() {
        console.log("didmonut",new Date(),this.props.match,this.props.location)
    }

    componentWillUnmount() {
        console.log("willunmonut",new Date(),this.props.match,this.props.location)
    }
    render(){
        return (
            <h1>message{ this.props.match.params.id }</h1>
        )
    }
}
