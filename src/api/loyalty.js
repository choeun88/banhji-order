/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url = baseUrl + '/loyaltys/'
// const url =baseUrl

module.exports = {
    rewardCreate                                : url + 'reward/' + instituteId + '/create',
    rewardGet                                   : url + 'reward/' + instituteId + '/get',
    rewardGets                                  : url + 'reward/' + instituteId + '/list',
    rewardDelete                                : url + 'reward/' + instituteId + '/del',
    loyaltyCardSettingCreate                    : url + 'setting/loyalty/' + instituteId + '/create',
    loyaltyCardSettingGet                       : url + 'setting/loyalty/' + instituteId + '/get',
    groupGet                                    : url + 'setting/group/' + instituteId + '/get',
    groupCreate                                 : url + 'setting/group/' + instituteId + '/create',
    loyaltyCardCreate                           : url + 'loyaltycard/' + instituteId + '/create',
    loyaltyCardGet                              : url + 'loyaltycard/' + instituteId + '/get',
    loyaltyCardGets                             : url + 'loyaltycard/' + instituteId + '/list',
    loyaltyCardDel                              : url + 'loyaltycard/' + instituteId + '/del',
    loyaltyAppCreate                           : url + 'loyaltyapp/' + instituteId + '/create',
    loyaltyAppGet                              : url + 'loyaltyapp/' + instituteId + '/get',
    loyaltyAppGets                             : url + 'loyaltyapp/' + instituteId + '/list',
    giftCardCreate                             : url + 'giftcard/' + instituteId + '/create',
    giftCardGet                                : url + 'giftcard/' + instituteId + '/get',
    giftCardGets                               : url + 'giftcard/' + instituteId + '/list',
    giftCardDelete                             : url + 'giftcard/' + instituteId + '/del',
    loyaltySearchCard                           : url + 'loyaltycard/' + instituteId + '/search',
    pointGets                                   : url + 'point/' + instituteId + '/list',
    pointCreate                                 : url + 'telegram/post',
    loyaltyCreate                               : url + 'loyalty/' + instituteId + '/create',
    loyaltyGets                                 : url + 'loyalty/' + instituteId + '/list',
    loyaltyGet                                  : url + 'loyalty/' + instituteId + '/get',
    generalGets                                 : url + 'general/' + instituteId + '/list',
    verifyCode                                  : url + 'verify/' + instituteId + '/get',
    updateCard : url + 'card/' + instituteId + '/update',
    importCard : url + 'card/' + instituteId + '/import',
    searchCardTxn: url + 'txn/' + instituteId + '/card',
}