import TodoList from '../TodoList'
import { connect } from 'react-redux'
import { toggleTodo } from '../../../action'
const getVisibleTodos = (todos, filter) =>{
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_ACTIVE':
            return todos.filter((item)=>{
                return !item.completed
            })
        case 'SHOW_COMPLETED':
            return todos.filter((item)=>{
                return item.completed
            })
    }
}
const mapStateToProps = (state, ownProps) =>{
    return {
        todos : getVisibleTodos(state.todos, state.visibilityFilter)
    }
}
const mapDispatchToProps = {
        onTodoClick: toggleTodo
    }

const VisibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList)
export default VisibleTodoList