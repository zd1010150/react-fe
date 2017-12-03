/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

// 同步redux的状态到localstorage里面
export const syncVuexStateAndLocalStorage = (state) => {
  for(let o in state){
    let value = state[o]
    setStore(o, typeof value == "object" ? JSON.stringify(value) : value)
  }
}
