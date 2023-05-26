/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();
const myUrl = require("@/url")
let baseUrl = myUrl.url
// if(process.env.VUE_APP_MODE == 'dev'){
//     baseUrl = 'https://dev-apis.banhji.com'
// }
const url          = baseUrl + '/entity-setting/'
// const url          = 'https://dev-apis.banhji.com/settings/'

module.exports = {
    currency_post                               : url + 'institute/' + instituteId + '/currency/add',
    currency_get                                : url + 'institute/' + instituteId + '/currency/list/',
    reporting_period_get                        : url + 'institute/' + instituteId + '/reporting-period/list/',
    exchange_rate                               : url + 'institute/' + instituteId + '/currency',
    currency_json                               : 'https://myconnect.s3-ap-southeast-1.amazonaws.com/currencymap.json'
}