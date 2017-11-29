let todoId = 0
const todos =( state = [], action) =>{
    switch (action.type){
        case 'ADD_TODO':
            return [
                ...state, {
                id: todoId++,
                text: action.text,
                completed: false
            }]
        case 'TOGGLE_TODO':
            return state.map((item)=>{
                if(item.id === action.id){
                    item.completed = !item.completed
                }
                return item
            })
        default:
            return state
    }


}
export default todos