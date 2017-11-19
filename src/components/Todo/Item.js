import React from 'react'
export default class TodoItem extends React.Component{
          render(){
            return (
              <li>
                {this.props.text}
                <button onClick={()=>{this.props.handleDelete(this.props.id)}}>X</button>
              </li>)
          }
        }
