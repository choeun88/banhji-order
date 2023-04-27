/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
let baseUrl = myUrl.url
// if(process.env.VUE_APP_MODE == 'dev'){
//     baseUrl = 'https://dev-apis.banhji.com'
// }

const url          = baseUrl + '/products/'
// const url          = 'https://dev-apis.banhji.com/entity-product/'

module.exports = {

    item_type_get                       : url + 'item-type/institute/' + instituteId + '/list',
    category_post                       : url + 'category/institute/' + instituteId + '/add',
    category_get                        : url + 'category/institute/' + instituteId + '/list',
    category_getv2                      : url + 'category-v2/institute/' + instituteId + '/list',
    category_getAllv2                   : url + 'category-allv2/institute/' + instituteId + '/list',

    group_post                          : url + 'group/institute/' + instituteId + '/add',
    group_get                           : url + 'group/institute/' + instituteId + '/list',
    group_getv2                         : url + 'group-v2/institute/' + instituteId + '/list',
    group_getallv2                      : url + 'group-allv2/institute/' + instituteId + '/list',
    group_put                           : url + 'group/institute/' + instituteId + '/update/',

    uomcategory_post                    : url + 'uomcategory/institute/' + instituteId + '/add',
    uomcategory_get                     : url + 'uomcategory/institute/' + instituteId + '/list',
    uomcategory_put                     : url + 'uomcategory/institute/' + instituteId + '/update/',

    uom_post                            : url + 'uom/institute/' + instituteId + '/add',
    uom_get                             : url + 'uom/institute/' + instituteId + '/list',
    uom_put                             : url + 'uom/institute/' + instituteId + '/update/',

    variant_type_post                   : url + 'vartype/institute/' + instituteId + '/add',
    variant_type_get                    : url + 'vartype/institute/' + instituteId + '/list',
    variant_type_put                    : url + 'vartype/institute/' + instituteId + '/update/',

    brand_post                          : url + 'brand/institute/' + instituteId + '/add',
    brand_get                           : url + 'brand/institute/' + instituteId + '/list',
    brand_put                           : url + 'brand/institute/' + instituteId + '/update/',

    saleuc_post                         : url + 'saleuc/institute/' + instituteId + '/add',
    saleuc_get                          : url + 'saleuc/institute/' + instituteId + '/list',
    saleuc_put                          : url + 'saleuc/institute/' + instituteId + '/update/',


    //currency
    currency                            : url + '/type/fnc',
    sub_group_post                      : url + 'subgroup/institute/' + instituteId + '/add',
    sub_group_get                       : url + 'subgroup/institute/' + instituteId + '/list',
    subgroup_getv2                     : url + 'subgroup-v2/institute/' + instituteId + '/list',
    subgroup_getallv2                  : url + 'subgroup-allv2/institute/' + instituteId + '/list',
    sub_group_put                       : url + 'subgroup/institute/' + instituteId + '/update/',

    // Product
    product_post                        : url + 'product/institute/' + instituteId + '/add',
    product_get                         : url + 'product/institute/' + instituteId + '/list',
    product_put                         : url + 'product/institute/' + instituteId + '/update/',
    product_filter                      : url + 'product/institute/' + instituteId + '/category/',

    // Attribute
    attribute_post                      : url + 'attribute/institute/' + instituteId + '/add',
    attribute_get                       : url + 'attribute/institute/' + instituteId + '/list',
    attribute_put                       : url + 'attribute/institute/' + instituteId + '/update/',

    catalog_post                        : url + 'product-catalog/institute/' + instituteId + '/add',
    catalog_get                         : url + 'product-catalog/institute/' + instituteId + '/list',

    product_category_segment_report     : url + 'category-segment-report/institute/' + instituteId + '/report',
    product_center                      : url + 'product/institute/' + instituteId + '/center',
    import_product                      : url + 'import-product/institute/' + instituteId + '/add',

    // Nature
    nature_post                         : url + 'nature/institute/' + instituteId + '/nature-add',
    nature_get                          : url + 'nature/institute/' + instituteId + '/nature-list'
}