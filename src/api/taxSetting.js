const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies
// const instituteId  = 'institute-0ab24220-808d-11ea-9131-1d2fe2a803b1'
const myUrl = require("@/url")
let baseUrl = myUrl.url
// if(process.env.VUE_APP_MODE == 'dev'){
//     baseUrl = 'https://dev-apis.banhji.com'
// }
const url          = baseUrl + '/entity-setting/'
// const url          = 'https://dev-apis.banhji.com/settings/'


module.exports = {
    tax_list_get                     : url + 'institute/' + instituteId + '/tax/list',
    tax_type_get                     : url + 'institute/' + instituteId + '/tax-type/list',
    tax_payer_get                    : url + 'institute/' + instituteId + '/tax-payer/list',
    tax_nature_get                   : url + 'institute/' + instituteId + '/tax-nature/list',
    tax_supcus_get                   : url + 'institute/' + instituteId + '/tax-supcus/list',

}