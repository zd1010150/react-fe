import { SELECT_SUBREDDIT,INVALIDATE_SUBREDDIT,REQUEST_POSTS,RECEIVE_POSTS,HTTP_ERROR } from './actionType'
import { combineReducers } from 'redux'
const selectedSubreddit = (state='reactjs',action) => {
    switch(action.type){
        case SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}
const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
},action) => {
   switch (action.type){
       case INVALIDATE_SUBREDDIT:
           return Object.assign({},state,{
               didInvalidate: true
           })
       case REQUEST_POSTS:
           return Object.assign({},state,{
               isFetching: true,
               didInvalidate: false
           })
       case RECEIVE_POSTS:
           return Object.assign({},state,{
               isFetching: false,
               didInvalidate: false,
               items: action.posts,
               lastUpdated: action.receivedAt
           })
       default:
           return state
   }
}
const postsBySubreddit = (state = [],action) =>{
    switch(action.type){
        case INVALIDATE_SUBREDDIT:
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return Object.assign({},state,{
                [action.subreddit] : posts(state[action.subreddit],action)
            })
        default:
            return state
    }
}
const httpRequest = (state = [],action) => {
    switch (action.type){
        case HTTP_ERROR:
            return Object.assign({},state,{
                httpErrors : state.concat([{
                    error:action.error,
                    url:action.url,
                    date:action.date
                }])
            })
        default:
          return state
    }

}
const rootReducer = {
    selectedSubreddit,
    postsBySubreddit,
    httpRequest
}
export default rootReducer
