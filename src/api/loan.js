const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/loan-settings/'
// const url          = 'https://dev-apis.banhji.com/loan-settings/'

module.exports = {
    purpose_post                                    : url + 'loanpurpose/institute/' + instituteId + '/add',
    purpose_get                                     : url + 'loanpurpose/institute/' + instituteId + '/list',
    loan_level_post                                 : url + 'loanlevel/institute/' + instituteId + '/add',
    loan_level_get                                  : url + 'loanlevel/institute/' + instituteId + '/list',
    product_post                                    : url + 'loanproduct/institute/' + instituteId + '/add',
    product_get                                     : url + 'loanproduct/institute/' + instituteId + '/list',
    saving_post                                     : url + 'savingproduct/institute/' + instituteId + '/add',
    saving_monthof_post                             : url + 'savingclosemonth/institute/' + instituteId + '/search',
    saving_get                                      : url + 'savingproduct/institute/' + instituteId + '/list',
    member_type_post                                : url + 'membertype/institute/' + instituteId + '/add',
    member_type_get                                 : url + 'membertype/institute/' + instituteId + '/list',
    decimal_post                                    : url + 'decimal/institute/' + instituteId + '/add',
    decimal_get                                     : url + 'decimal/institute/' + instituteId + '/list',
    main_block_post                                 : url + 'mainblock/institute/' + instituteId + '/add',
    main_block_get                                  : url + 'mainblock/institute/' + instituteId + '/list',
    sub_block_post                                  : url + 'subblock/institute/' + instituteId + '/add',
    sub_block_get                                   : url + 'subblock/institute/' + instituteId + '/list',
    zone_post                                       : url + 'zone/institute/' + instituteId + '/add',
    zone_get                                        : url + 'zone/institute/' + instituteId + '/list',
    group_member_post                               : url + 'groupmember/institute/' + instituteId + '/add',
    group_member_get                                : url + 'groupmember/institute/' + instituteId + '/list',
    price_per_share_post                            : url + 'priceshare/institute/' + instituteId + '/add',
    price_per_share_get                             : url + 'priceshare/institute/' + instituteId + '/list',
    type_of_share_post                              : url + 'typeshare/institute/' + instituteId + '/add',
    type_of_share_get                               : url + 'typeshare/institute/' + instituteId + '/list',
    member_fee_post                                 : url + 'memberfee/institute/' + instituteId + '/add',
    member_fee_get                                  : url + 'memberfee/institute/' + instituteId + '/list',
    user_pin_post                                   : url + 'userpin/institute/' + instituteId + '/add',
    user_pin_get                                    : url + 'userpin/institute/' + instituteId + '/list',
    segment_post                                    : url + 'segment/institute/' + instituteId + '/add',
    segment_get                                     : url + 'segment/institute/' + instituteId + '/list',
    penalty_post                                    : url + 'penalty/institute/' + instituteId + '/add',
    penalty_get                                     : url + 'penalty/institute/' + instituteId + '/list',
    share_account_post                              : url + 'shareaccount/institute/' + instituteId + '/add',
    share_account_get                               : url + 'shareaccount/institute/' + instituteId + '/list',
    share_amount_post                               : url + 'shareamount/institute/' + instituteId + '/add',
    share_amount_get                                : url + 'shareamount/institute/' + instituteId + '/list',
    loan_interest_post                              : url + 'loaninterest/institute/' + instituteId + '/add',
    loan_interest_get                               : url + 'loaninterest/institute/' + instituteId + '/list',
    saving_interest_post                            : url + 'savinginterest/institute/' + instituteId + '/add',
    saving_interest_get                             : url + 'savinginterest/institute/' + instituteId + '/list',
    accountNameGet                                  : url + 'accountname/institute/' + instituteId + '/get',
    accountNamePost                                 : url + 'accountname/institute/' + instituteId + '/add',
    businessSettingGet                              : url + 'businesssetting/institute/' + instituteId + '/get',
    businessSettingCreate                           : url + 'businesssetting/institute/' + instituteId + '/add',
    userPinSearch                                   : url + 'userpin/institute/' + instituteId + '/search',
    careerGet                                       : url + 'career/institute/' + instituteId + '/get',
    careerPost                                      : url + 'career/institute/' + instituteId + '/add',
    livingConditionGet                              : url + 'livingcondition/institute/' + instituteId + '/get',
    livingConditionPost                             : url + 'livingcondition/institute/' + instituteId + '/add',
}