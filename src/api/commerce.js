/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url = baseUrl + '/commerce-service/'

module.exports = {
    settingGet                                  : url + 'setting/' + instituteId + '/get',
    settingCreate                               : url + 'setting/' + instituteId + '/create',
    campaignCreate                              : url + 'campaign/' + instituteId + '/create',
    campaignGet                                 : url + 'campaign/' + instituteId + '/get',
    campaignGets                                : url + 'campaign/' + instituteId + '/list',
    campaignDelete                              : url + 'campaign/' + instituteId + '/del',
    campCouponGets                              : url + 'campaign/coupon/' + instituteId + '/get',
    itemSearch                                  : url + 'item/' + instituteId + '/search/',
    customerSearch                              : url + 'customer/' + instituteId + '/search/',
    rewardCreate                                : url + 'reward/' + instituteId + '/create',
    rewardGet                                   : url + 'reward/' + instituteId + '/get',
    rewardGets                                  : url + 'reward/' + instituteId + '/list',
    rewardDelete                                : url + 'reward/' + instituteId + '/del',
    partnerCreate                               : url + 'partner/' + instituteId + '/create',
    partnerGet                                  : url + 'partner/' + instituteId + '/get',
    partnerGets                                 : url + 'partner/' + instituteId + '/list',
    deletePartner                               : url + 'partner/' + instituteId + '/del',
    getAllItem                                  : url + 'allitem/' + instituteId + '/list',
    getPLItem                                   : url + 'allpricegets/' + instituteId + '/list',
    storeCreate                                 : url + 'store/' + instituteId + '/create',
    storeGet                                    : url + 'store/' + instituteId + '/get',
    storeGets                                   : url + 'store/' + instituteId + '/list',
    registerGets                                : url + 'register/' + instituteId + '/list',
    registerCreate                              : url + 'register/' + instituteId + '/create',
    pinCreate                                   : url + 'pin/' + instituteId + '/create',
    pinGet                                      : url + 'pin/' + instituteId + '/get',
    pinGets                                     : url + 'pin/' + instituteId + '/list',
    sesNumGenerate                              : url + 'session/' + instituteId + '/number',
    sessionCreate                               : url + 'session/' + instituteId + '/create',
    sessionGet                                  : url + 'session/' + instituteId + '/get',
    sessionGets                                 : url + 'session/' + instituteId + '/list',
    orderNumberGet                              : url + 'ordernumber/' + instituteId + '/get',
    txnCreate                                   : url + 'txn/' + instituteId + '/create',
    txnGet                                      : url + 'txn/' + instituteId + '/get',
    txnGets                                     : url + 'txn/' + instituteId + '/list',
    txnDel                                      : url + 'txn/' + instituteId + '/del',
    txnNumberGet                                : url + 'txnnumber/' + instituteId + '/get',
    getGsi2                                     : url + 'generalgsit/' + instituteId + '/list',
    genGet                                      : url + 'general/' + instituteId + '/list',
    generalGet                                  : url + 'general/' + instituteId + '/get',
    reportGets                                  : url + 'report/' + instituteId + '/list',
    cashCountCreate                             : url + 'cashcount/' + instituteId + '/add',
    frontDisplay                                : url + 'frontdisplay/' + instituteId + '/add',
    keyGet                                      : url + 'key/' + instituteId + '/get',
    storeLogin                                  : url + 'store/' + instituteId + '/login',
}