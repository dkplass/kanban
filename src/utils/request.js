import axios from 'axios'
import { app } from '@/main'

const apiStatusResponseHandler = (status, msg) => {
  switch (status) {
    case 400:
      // 登入失敗
      app.$bvToast.toast(msg, {
        title: 'Server response',
        variant: 'error'
      })
      break
    case 401:
      // 未登入或認證過期
      app.$bvToast.toast(msg, {
        title: 'Server response',
        variant: 'error'
      })
      break
    case 403:
      // 權限不足
      app.$bvToast.toast(msg, {
        title: 'Server response',
        variant: 'error'
      })
      break
    case 404:
      // 請求失敗
      app.$bvToast.toast(msg, {
        title: 'Server response',
        variant: 'error'
      })
      break
    default:
      // 為定義錯誤
      app.$bvToast.toast(`response 沒有定義的錯誤碼 - ${msg}`, {
        title: 'Server response',
        variant: 'error'
      })
  }
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // app.$bvToast.toast(response.statusText, {
    //   title: 'Server response',
    //   variant: 'success'
    // })
    return response.data
  },
  error => {
    // API should handle error and response
    console.log('err' + error) // for debug
    apiStatusResponseHandler(0, error)
    return Promise.reject(error)
  }
)

export default service
