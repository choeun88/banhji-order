/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-financing/'
// const url          = 'https://dev-apis.banhji.com/loan-settings/'

module.exports = {
    loanGet                                 : url + 'loan/institute/' + instituteId + '/get',
    loanGets                                : url + 'loan/institute/' + instituteId + '/list',
    loanCreate                              : url + 'loan/institute/' + instituteId + '/create',
    loanReceiptCreate                       : url + 'loanreceipt/institute/' + instituteId + '/create',
    loanOutstandingReport                   : url + 'loanoutstanding/institute/' + instituteId + '/get',
    summaryLoanBalance                      : url + 'summaryloanbalance/institute/' + instituteId + '/get',
    loanRepaymentReport                     : url + 'loanrepayment/institute/' + instituteId + '/get',
    loanPaymentCreate                       : url + 'loanpayment/institute/' + instituteId + '/create',
    loanScheduleGet                         : url + 'loanschedule/institute/' + instituteId + '/list/',
    getBalanceMonthly                       : url + 'monthlyloanbalance/institute/' + instituteId + '/get',
    getRepaymentMonthly                     : url + 'monthlyloanrepay/institute/' + instituteId + '/get',
    getLastNumber                           : url + 'lastnumber/institute/' + instituteId + '/add',
    centerTxnSearch                         : url + 'centertxn/institute/' + instituteId + '/search',
    closeLoanCreate                         : url + 'closeloan/institute/' + instituteId + '/create',
}