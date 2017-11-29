import React from 'react';
import {AddTodo, VisibleTodoList, Footer } from "../components/Todo"
import reducers from "../reducers"
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(reducers)
    store.subscribe(()=>{
    console.log("===",store.getState())
})
export default class Todolist extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            <AddTodo/>
            <VisibleTodoList/>
            <Footer/>
          </div>
        </Provider>
    )
  }
}
