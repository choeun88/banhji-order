const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies

const myUrl = require("@/url")
let baseUrl = myUrl.url
// if(process.env.VUE_APP_MODE == 'dev'){
//     baseUrl = 'https://dev-apis.banhji.com'
// }
// const baseUrl = myUrl.url
const url          = baseUrl + '/pos-service/'
// const url          = 'https://dev-apis.banhji.com/loan-settings/'

module.exports = {
    formContentGet                                  : url + 'formcontent/institute/' + instituteId + '/get',
    formContentPost                                 : url + 'formcontent/institute/' + instituteId + '/add',
    segmentGet                                      : url + 'segment/institute/' + instituteId + '/get',
    segmentPost                                     : url + 'segment/institute/' + instituteId + '/add',
    accountNameGet                                  : url + 'accountname/institute/' + instituteId + '/get',
    accountNamePost                                 : url + 'accountname/institute/' + instituteId + '/add',
    locationGet                                     : url + 'location/institute/' + instituteId + '/get',
    locationPost                                    : url + 'location/institute/' + instituteId + '/add',
    priceLevelGet                                   : url + 'pricelevel/institute/' + instituteId + '/get',
    priceLevelPost                                  : url + 'pricelevel/institute/' + instituteId + '/add',
    customerSettingGet                              : url + 'customersetting/institute/' + instituteId + '/get',
    customerSettingPost                             : url + 'customersetting/institute/' + instituteId + '/add',
    categorySettingPost                             : url + 'categorysetting/institute/' + instituteId + '/add',
    categorySettingGet                              : url + 'categorysetting/institute/' + instituteId + '/get',
    paymentOptionPost                               : url + 'paymentoption/institute/' + instituteId + '/add',
    paymentOptionGet                                : url + 'paymentoption/institute/' + instituteId + '/get',
    sessionSettingPost                              : url + 'sessionsetting/institute/' + instituteId + '/add',
    sessionSettingGet                               : url + 'sessionsetting/institute/' + instituteId + '/get',
    saleChannelSettingPost                          : url + 'salechannelsetting/institute/' + instituteId + '/add',
    saleChannelSettingGet                           : url + 'salechannelsetting/institute/' + instituteId + '/get',
}