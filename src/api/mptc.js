/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl         = require("@/url")
const baseUrl       = myUrl.url
const url           = baseUrl + '/mptc-entity-license/'

module.exports = {
    // Deductible Expense
    deductible_expense_post             : url + 'expense-revenue/institute/' + instituteId + '/add',
    deductible_expense_get              : url + 'expense-revenue/institute/' + instituteId + '/list',
    connect_license_post                : url + 'connect-license/institute/' + instituteId + '/add',
    connect_license_get                 : url + 'connect-license/institute/' + instituteId + '/get',
    connect_license_by_id               : url + 'connect-license-by-id/institute/' + instituteId + '/get',
    license_get                         : url + 'licenses/institute/' + instituteId + '/list',

}