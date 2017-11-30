import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../flow/action'
import Picker from '../component/picker'
import Posts from '../component/post'
import Error from '../component/error'

class ReddipostsView extends Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  componentDidMount(){
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.selectedSubreddit !== this.props.selectedSubreddit){
      let { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }
  handleChange(nextSubreddit){
    this.props.dispatch(selectSubreddit(nextSubreddit))
  }
  handleRefreshClick(e){
    e.preventDefault()
    let { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }
  render(){
    const { httpErrors,selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Error errors={httpErrors}/>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}
ReddipostsView.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  httpErrors: PropTypes.array
}
function mapStateToProps( { reddiPosts } ){
  const { selectedSubreddit, postsBySubreddit,httpErrors } = reddiPosts
  const { isFetching, lastUpdated, items: posts} = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }
  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
    httpErrors
  }
}
function mapDispatchToProps(dispatch){
  
}
export default connect(mapStateToProps)(ReddipostsView)
