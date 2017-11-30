import React from 'react'
import AddTodo from './Add'
import VisibleTodoList from './VisibleTodoList'
import Footer from '../component/Footer'
import { Link,Route } from 'react-router-dom'
import  ReddipostsView  from '../../Reddiposts/container'

export default class Todolist extends React.Component {
    render() {
        return (
            <div>
                <AddTodo/>
                <VisibleTodoList/>
                <Footer/>
                <Link to="/todo/reddiposts">reddi</Link>
                <Route path="/todo/reddiposts" component={ ReddipostsView }/>
            </div>
        )
    }
}
