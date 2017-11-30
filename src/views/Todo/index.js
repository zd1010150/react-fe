import React from 'react';
import {AddTodo, VisibleTodoList, Footer } from "./components/index"

class Todolist extends React.Component {
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
