
import { injectReducers } from '../../store/reducers'

import ReddipostsView from './container/index'
import reddiPostReducers from './flow/reducer'
const Reddiposts = (store) =>{
  injectReducers(store,{
    reddiPosts: reddiPostReducers
  })
  return ReddipostsView
}
export default Reddiposts
