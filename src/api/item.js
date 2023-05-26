/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-item/'
// const url          = 'https://dev-apis.banhji.com/entity-items/'

module.exports = {
    product_variant_get                 : url + 'item/',
    product_variant_post                : url + 'item/institute/' + instituteId + '/add',
    product_variant_list                : url + 'item/institute/' + instituteId + '/search/',
    product_variant_category            : url + 'item/category/',
    upload                              : url + 'item/institute/' + instituteId + '/upload',
    service_item_post                   : url + 'service-item/institute/' + instituteId + '/add',
    service_item_get                    : url + 'service-item/institute/' + instituteId + '/list',
    service_item_filter                 : url + 'service-item/institute/' + instituteId + '/category/',
    service_item_list                   : url + 'service-item/institute/' + instituteId + '/search/',
    service_upload                      : url + 'service-item/institute/' + instituteId + '/upload',

    transaction_item_post               : url + 'transaction-item/institute/' + instituteId + '/add',
    transaction_item_get                : url + 'transaction-item/institute/' + instituteId + '/list',
    saleUnit_item_post                  : url + 'saleunit-item/institute/' + instituteId + '/add',
    saleUnit_item_get                   : url + 'saleunit-item/institute/' + instituteId + '/list',
    discount_item_post                  : url + 'discount-item/institute/' + instituteId + '/add',
    discount_item_get                   : url + 'discount-item/institute/' + instituteId + '/list',
    other_charge_post                   : url + 'other-charge/institute/' + instituteId + '/add',
    other_charge_get                    : url + 'other-charge/institute/' + instituteId + '/list',
    late_fee_post                       : url + 'late-fee/institute/' + instituteId + '/add',
    late_fee_get                        : url + 'late-fee/institute/' + instituteId + '/list',

    //item modifier
    itemModifier_post                   : url + 'item-modifier/institute/' + instituteId + '/add',
    itemModifier_list                   : url + 'item-modifier/institute/' + instituteId + '/list',
    itemModifier_search                 : url + 'item-modifier/institute/' + instituteId + '/search',
    item_search                         : url + 'item/institute/' + instituteId + '/filter/',
    item_searchv2                       : url + 'item-v2/institute/' + instituteId + '/filter/',
    item_variant_search                 : url + 'item/institute/' + instituteId + '/item/',

    discount_item_report                : url + 'discount-item-txn/institute/' + instituteId + '/discount-item-txn',
    sale_channel_report                 : url + 'sale-channel-txn/institute/' + instituteId + '/sale-channel-txn',
    sale_unit_report                    : url + 'saleunit-item-txn/institute/' + instituteId + '/saleunit-item-txn',
    other_charge_report                 : url + 'other-charge-txn/institute/' + instituteId + '/other-charge-txn',
    price_level_report                  : url + 'price-level-txn/institute/' + instituteId + '/price-level-txn',

    item_by_txn                         : url + 'item-txn/institute/' + instituteId + '/list',
    item_by_category                    : url + 'item/institute/' + instituteId + '/itemByCategory',
    stock_count_adjustment              : url + 'stock-count-adjustment/institute/' + instituteId + '/adjustment',
    item_by_license                     : url + 'item-by-license/institute/' + instituteId + '/list',

    variant_one                         : url + 'variant/institute/' + instituteId + '/item',
    import_service                      : url + 'import-service/institute/' + instituteId + '/add',

    // Type 
    type_post                           : url + 'type/institute/' + instituteId + '/add',
    type_get                            : url + 'type/institute/' + instituteId + '/list',
    nature_post                         : url + 'nature/institute/' + instituteId + '/add',
    nature_get                          : url + 'nature/institute/' + instituteId + '/list',
    attribute_update                    : url + 'attribute-update/institute/' + instituteId + '/attribute-update'
}