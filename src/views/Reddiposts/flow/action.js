import { SELECT_SUBREDDIT,INVALIDATE_SUBREDDIT,REQUEST_POSTS,RECEIVE_POSTS,HTTP_ERROR } from './actionType'
import fetch from 'isomorphic-fetch'

export const selectSubreddit = (subreddit) =>{
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}
export const invalidateSubreddit = (subreddit)=>{
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}
export const requestPosts = (subreddit) =>{
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}
export const receivePosts = (subreddit, json) => {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}
export const requestError = (error,url,date) =>{
    return {
        type: HTTP_ERROR,
        error,
        url,
        date
    }
}
const fetchPosts = (subreddit) => {
    return (dispatch) => {
        dispatch(requestPosts(subreddit))
        return fetch(`http://www.subreddit.com/r/${subreddit}.json`).then(
            response => response.json(),

        ).then(
            json => dispatch(receivePosts(subreddit,json))
        ).catch((error) => dispatch(requestError(error),`http://www.subreddit.com/r/${subreddit}.json`),new Date())
    }
}
const shouldFetchPosts = (state,subreddit) =>{
    const posts = state.postsBySubreddit[subreddit]
    if(!posts){
        return true
    }else if(posts.isFetching){
        return false
    }else{
        return posts.didInvalidate
    }

}
export function fetchPostsIfNeed(subreddit){
    return (dispatch, getState) => {
        if(shouldFetchPosts(getState(),subreddit)){
            return dispatch(fetchPosts(subreddit))
        }else{
            return Promise.resolve()
        }
    }
}
