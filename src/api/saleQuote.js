const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies
const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/sale-quote/'
// const url          = 'https://gddzkiu7m0.execute-api.ap-southeast-1.amazonaws.com/dev/v1/sale-quote/'

module.exports = {
    sale_quote_post                               : url + 'quote/institute/' + instituteId + '/add',
    sale_quote_get                                : url + 'quote/institute/' + instituteId + '/list',
    sale_quote_history                            : url + 'quote/institute/' + instituteId + '/history',
}