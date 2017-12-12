/* eslint-disable one-var,handle-callback-err */
import Store from 'store'
import { SET_TOKEN, SET_USERINFO } from 'store/mutation-types'
import fetch from './fetch'

/**
 * 处理各种服务器返回错误
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */

let handlerFailedResponse = (response) => {
  if (response.status_code === 401) {
    vm.toastr.error(vm.$t('info.Unauthenticated'))
    Store.commit(SET_USERINFO, null)
    Store.commit(SET_TOKEN, null)
    vm.$router.replace('/login')
  } else if (response.status_code === 429) {
    vm.toastr.error(vm.$t('info.TOO_MANY_REQUEST'))
  } else if (response.status_code === 404) {
    if (window.vm) {
      window.vm.$router.replace('/error')
    }
  } else {
    vm.toastr.error(vm.$t('info.' + response.message) ? vm.$t('info.' + response.message) : response.message)
  }
}
/**
 * 处理http请求错误
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
let filterRejectResponse = (error) => {
  vm.toastr.error(vm.$t('info.NETWORK_ERROR'))
}

let fetchData = async function (type = 'GET', url = '', data = {}) {
  return fetch(type, url, data).then((response) => {
    let success = response.status_code === 200
    if (!success) {
      handlerFailedResponse(response)
    }
    return {
      data: response.data,
      success: success,
      message: response.message,
      errors: response.errors
    }
  }, (error) => {
    filterRejectResponse(error)
  })
}

export { fetchData }
