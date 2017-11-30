import React from 'react'
import AddTodo from './Add'
import VisibleTodoList from './VisibleTodoList'
import Footer from '../component/Footer'

export default class Todolist extends React.Component {
    render() {
        return (
            <div>
                <AddTodo/>
                <VisibleTodoList/>
                <Footer/>
            </div>
        )
    }
}
