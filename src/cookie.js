'use strict'

const jwt = require('jsonwebtoken')
const axios = require('axios')
const {
  dataStore
} = require('./observable/store')

const getCookie = (cname) => {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ''
}

module.exports.getCookie = () => {
  try {
    const banhjiCookie = getCookie('banhji-order-token' + process.env.VUE_APP_MODE)
    // window.console.log(process.env.VUE_APP_U, 'pro')
    if (banhjiCookie !== '') {
      const cookie = jwt.verify(banhjiCookie, process.env.VUE_APP_JWT_SESCRET)
      
      /* Apply token to global axios defaults */
      const AUTH_TOKEN = cookie.accessToken

      // Request interceptor for API calls
      axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers = {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }

        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error)
      })

      // Response interceptor for API calls
      axios.interceptors.response.use((response) => {
        return response
      }, async function (error) {
        const originalRequest = error.config
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true
          axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`

          return axios(originalRequest)
        }

        return Promise.reject(error)
      })
      cookie.instituteId = cookie.store.sk
      // window.console.log(cookie, 'coookie')
      return cookie
    } else {
      dataStore.isValidUser = false
      return false
    }
  } catch (error) {
    window.console.error(error)
    return false /* For auth validation */
  }
}
module.exports.login = (username, pwd) => {
  try {
    // window.console.log(username, pwd, process.env.VUE_APP_U, process.env.VUE_APP_P)
    if(username === process.env.VUE_APP_U && pwd ===  process.env.VUE_APP_P){
      return true
    }else{
      return false
    }
  } catch (error) {
    window.console.error(error)
    return false /* For auth validation */
  }
}
