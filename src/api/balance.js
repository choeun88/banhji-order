/* Cookie */
const cookieJS = require('@/cookie.js')
const {
  instituteId
} = cookieJS.getCookie()

const myUrl = require('@/url')
const baseUrl = myUrl.url
const url = baseUrl + '/balance/'
// window.console.log('base url' + baseUrl , 'url'+ url)
module.exports = {
  last_balance: url + 'balance/institute/' + instituteId + '/last-balance',
  customer_vendor: url + 'cusvendor/institute/' + instituteId + '/cus-vendor'
}
