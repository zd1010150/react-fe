import fetch from 'isomorphic-fetch';
import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS, HTTP_ERROR } from './actionType';


export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit,
});
export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit,
});
export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit,
});
export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now(),
});
export const requestError = (error, url, date) => ({
  type: HTTP_ERROR,
  error,
  url,
  date,
});
const fetchPosts = subreddit => (dispatch) => {
  dispatch(requestPosts(subreddit));
  return fetch(`http://www.subreddit.com/r/${subreddit}.json`).then(response => response.json()).then(json => dispatch(receivePosts(subreddit, json))).catch(error => dispatch(requestError(error), `http://www.subreddit.com/r/${subreddit}.json`), new Date());
};
const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit && state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};
export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
    return Promise.resolve();
  };
}
