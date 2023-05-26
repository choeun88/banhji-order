/*
 * Last modified : 1/28/21, 5:20 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
let baseUrl = myUrl.url
// if(process.env.VUE_APP_MODE == 'dev'){
//     baseUrl = 'https://dev-apis.banhji.com'
// }
const warehouseUrl          = baseUrl + '/warehouses/'
module.exports = {
    //Wh Setting
    wh_setting_post                     : warehouseUrl + 'warehouses/institute/' + instituteId + '/add',
    wh_setting_get                      : warehouseUrl + 'warehouses/institute/' + instituteId + '/listAll',
    wh_setting_put                      : warehouseUrl + 'warehouses/institute/' + instituteId + '/update/',
    wht_get                             : warehouseUrl + 'warehouses/wht/institute/' + instituteId + '/list',

    //Zone Setting
    zone_setting_post                   : warehouseUrl + 'zones/institute/' + instituteId + '/add',
    zone_setting_get                    : warehouseUrl + 'zones/institute/' + instituteId + '/list',
    zone_setting_put                    : warehouseUrl + 'zones/institute/' + instituteId + '/update/',
    zone_type_get                       : warehouseUrl + 'zonetype/institute/' + instituteId + '/list',

    //Section Setting
    section_setting_post                : warehouseUrl + 'sections/institute/' + instituteId + '/add',
    section_setting_get                 : warehouseUrl + 'sections/institute/' + instituteId + '/list',
    section_setting_put                 : warehouseUrl + 'sections/institute/' + instituteId + '/update/',

    //Rack Setting
    rack_setting_post                   : warehouseUrl + 'racks/institute/' + instituteId + '/add',
    rack_setting_get                    : warehouseUrl + 'racks/institute/' + instituteId + '/list',
    rack_setting_put                    : warehouseUrl + 'racks/institute/' + instituteId + '/update/',

    //Level Setting
    level_setting_post                  : warehouseUrl + 'levels/institute/' + instituteId + '/add',
    level_setting_get                   : warehouseUrl + 'levels/institute/' + instituteId + '/list',
    level_setting_put                   : warehouseUrl + 'levels/institute/' + instituteId + '/update/',

    //batch
    batch_post                          : warehouseUrl + 'batch/institute/' + instituteId + '/add',
    batch_get                           : warehouseUrl + 'batch/institute/' + instituteId + '/list',

    //Warranty Condition
    warrantyCondition_post              : warehouseUrl + 'warranty/condition/institute/' + instituteId + '/add',
    warrantyCondition_get               : warehouseUrl + 'warranty/condition/institute/' + instituteId + '/list',

    //warranty
    warranty_post                       : warehouseUrl + 'warranty/institute/' + instituteId + '/add',
    warranty_get                        : warehouseUrl + 'warranty/institute/' + instituteId + '/list',

    //bom
    bom_post                            : warehouseUrl + 'bom/institute/' + instituteId + '/add',
    bom_get                             : warehouseUrl + 'bom/institute/' + instituteId + '/list',
    bom_getByProduct                    : warehouseUrl + 'bom/institute/' + instituteId + '/item/',

    //start_production order
    productionOrder_post                : warehouseUrl + 'product-order/institute/' + instituteId + '/add',
    productionOrder_get                 : warehouseUrl + 'product-order/institute/' + instituteId + '/list',
    productionOrder_getById             : warehouseUrl + 'product-order/institute/' + instituteId + '/',

    //start_production
    production_post                     : warehouseUrl + 'production/institute/' + instituteId + '/add',
    production_get                      : warehouseUrl + 'production/institute/' + instituteId + '/list',
    production_getById                  : warehouseUrl + 'production/institute/' + instituteId + '/',

    //internal usage
    internalUsage_post                  : warehouseUrl + 'internal-usage/institute/' + instituteId + '/add',
    internalUsage_get                   : warehouseUrl + 'internal-usage/institute/' + instituteId + '/list',
    internalUsage_getById               : warehouseUrl + 'internal-usgae/institute/' + instituteId + '/',

    //bin
    bin_post                            : warehouseUrl + 'bin/institute/' + instituteId + '/add',
    bin_get                             : warehouseUrl + 'bin/institute/' + instituteId + '/list',

    //receipt order
    receiptOrder_post                   : warehouseUrl + 'receipt-order/institute/' + instituteId + '/add',
    receiptOrder_get                    : warehouseUrl + 'receipt-order/institute/' + instituteId + '/list',
    receiptOrder_getById                : warehouseUrl + 'receipt-order/institute/' + instituteId + '/',
    receiptOrder_batch                  : warehouseUrl + 'receiptorder/batch',

    //shelving order
    shelvingOrder_post                   : warehouseUrl + 'shelving-order/institute/' + instituteId + '/add',
    shelvingOrder_get                    : warehouseUrl + 'shelving-order/institute/' + instituteId + '/list',
    shelvingOrder_getById                : warehouseUrl + 'shelving-order/institute/' + instituteId + '/',

    //delivery order
    deliveryOrder_post                   : warehouseUrl + 'delivery-order/institute/' + instituteId + '/add',
    deliveryAgency_post                  : warehouseUrl + 'delivery-agency/institute/' + instituteId + '/add',
    deliveryOrder_get                    : warehouseUrl + 'delivery-order/institute/' + instituteId + '/list',
    deliveryAgendcy_get                  : warehouseUrl + 'delivery-agency/institute/' + instituteId + '/list',
    deliveryOrder_getById                : warehouseUrl + 'delivery-order/institute/' + instituteId + '/',
    deliveryAgency_getById               : warehouseUrl + 'delivery-agency/institute/' + instituteId + '/',

    //item
    item_post                            : warehouseUrl + 'product-variant/institute/' + instituteId + '/add',
    item_get                             : warehouseUrl + 'product-variant/institute/' + instituteId + '/list',

    //transfer order
    transferOrder_post                   : warehouseUrl + 'transfer-order/institute/' + instituteId + '/add',
    transferOrder_get                    : warehouseUrl + 'transfer-order/institute/' + instituteId + '/list',
    transferOrder_getById                : warehouseUrl + 'transfer-order/institute/' + instituteId + '/',

    //task
    task_post                            : warehouseUrl + 'task/institute/' + instituteId + '/add',
    task_get                             : warehouseUrl + 'task/institute/' + instituteId + '/list',
    task_getByFrequency                  : warehouseUrl + 'task/institute/' + instituteId + '/',
    task_setting_post                    : warehouseUrl + 'task-setting/institute/' + instituteId + '/add',
    task_type_get                        : warehouseUrl + 'task-type/institute/' + instituteId + '/list',
    task_sub_type_get                    : warehouseUrl + 'task-sub-type/institute/' + instituteId + '/list',
    task_category_get                    : warehouseUrl + 'task-category/institute/' + instituteId + '/list',

    balance_get                          : warehouseUrl + 'warehouse-balance/institute/' + instituteId + '/item/',
    balance_getAll                       : warehouseUrl + 'warehouse-balance-all/institute/' + instituteId + '/list',
    txn_get                              : warehouseUrl + 'warehouse-txn/institute/' + instituteId + '/list',

    //PO ItemLine
    itemline_add                         : warehouseUrl + 'receiptorder/txn/',
    //check number
    checknumber                          : warehouseUrl + 'checknumber/' + instituteId + '/search',
}
