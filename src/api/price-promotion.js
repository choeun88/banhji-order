const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();
const myUrl = require("@/url")
let baseUrl = myUrl.url
// if(process.env.VUE_APP_MODE == 'dev'){
//     baseUrl = 'https://dev-apis.banhji.com'
// }
const url          = baseUrl + '/item-price/'
// const url          = 'https://dev-apis.banhji.com/price-promotion/'

module.exports = {

    price_level_post                    : url + 'pricelevel/institute/' + instituteId + '/add',
    price_level_get                     : url + 'pricelevel/institute/' + instituteId + '/list',

    price_level_type_post               : url + 'pricelevel-type/institute/' + instituteId + '/add',
    price_level_type_get                : url + 'pricelevel-type/institute/' + instituteId + '/list',

    uom_conversion                      : url + 'uom-conversion/item/',
    uom_conversion_new                  : url + 'uom-conversion-new/item/',
    uom_price                           : url + 'uom-price/institute/' + instituteId + '/item/',
    uom_service_item_price_post         : url + 'uom-price/institute/' + instituteId + '/service-item/',
    uom_service_conversion              : url + 'uom-conversion/service-item/',
    uom_service_price                   : url + 'uom-price/service-item/',

    item_byPriceLevel                   : url + 'item-by-pricelevel/institute/' + instituteId + '/item-by-pricelevel',
    item_setPrice_post                  : url + 'item-price/institute/' + instituteId + '/add',
    item_uomPrice_get                   : url + 'item-uom-price/institute/' + instituteId + '/list?',
    standard_cost                       : url + 'standard-cost/institute/' + instituteId + '/standard-cost',
    standard_cost_post                  : url + 'standard-cost/institute/' + instituteId + '/standard-cost-add',
    standard_cost_analysis_post         : url + 'standard-cost-analysis/institute/' + instituteId + '/standard-cost-analysis',
    standard_cost_set_cost              : url + 'standard-cost/institute/' + instituteId + '/set-cost'
}