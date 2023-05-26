/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-setting/'
const urlSe        = baseUrl + '/products/' //https://dev-apis.banhji.com/products/dimension/institute/:institute_id/delete
// const url          = 'https://dev-apis.banhji.com/settings/'

module.exports = {

    class_get                        : url + 'institute/' + instituteId + '/class/list',
    class_subclass_get               : url + 'institute/' + instituteId + '/class/',
    class_post                       : url + 'institute/' + instituteId + '/class/add',

    segment_get                      : url + 'institute/' + instituteId + '/segment/list',
    segment_by_nature_get             : url + 'segment-by-nature/institute/' + instituteId + '/list',
    segment_post                     : url + 'institute/' + instituteId + '/segment/add',

    segment_type_get                 : url + 'institute/' + instituteId + '/segment-type/list',
    segment_type_post                : url + 'institute/' + instituteId + '/segment-type/add',

    subclass_get                     : url + 'institute/' + instituteId + '/subclass/list',
    subclass_post                    : url + 'institute/' + instituteId + '/sub-class/add',

    location_get                     : url + 'institute/' + instituteId + '/location/list',
    location_post                    : url + 'institute/' + instituteId + '/location/add',
    
    location_type_get                : url + 'institute/' + instituteId + '/location-type/list',
    location_type_post               : url + 'institute/' + instituteId + '/location-type/add',

    closing_date_get                 : url + 'institute/' + instituteId + '/closing-date/list',
    closing_date_last                : url + 'institute/' + instituteId + '/closing-date/last',
    closing_date_post                : url + 'institute/' + instituteId + '/closing-date/add',
    prefix_get                       : url + 'institute/' + instituteId + '/prefix/list',
    prefix_post                      : url + 'institute/' + instituteId + '/prefix/add',
    prefix_function_get              : url + 'institute/' + instituteId + '/prefix/function/',

    payment_option_get               : url + 'institute/' + instituteId + '/payment-option/list',
    payment_option_post              : url + 'institute/' + instituteId + '/payment-option/add',
    payment_setting_post             : url + 'institute/' + instituteId + '/payment-setting/add',
    payment_setting_get              : url + 'institute/' + instituteId + '/payment-setting/list',
    other_account_get                : url + 'institute/' + instituteId + '/other-account/list',
    form_post                        : url + 'form/institute/' + instituteId + '/add',
    form_get                         : url + 'form/institute/' + instituteId + '/list',
    form_delete                      : url + 'form/institute/' + instituteId + '/delete',
    payment_option_detail            : url + 'institute/' + instituteId + '/payment-option/detail',


    // form contant
    accounting_form_content_post     : url + 'accounting-form-content/institute/' + instituteId + '/add',
    accounting_form_content_get      : url + 'accounting-form-content/institute/' + instituteId + '/get',

    delete_dimension                 : urlSe +'dimension/institute/' + instituteId +'/delete',
    nbc_xrate                        : url +'nbc-xrate/institute/' + instituteId +'/daily',
    institutes                       : url +'institutes/list',
    ctr_post                        : url + 'ctr/institute/' + instituteId + '/add-ctr',
    ctr_get                         : url + 'ctr/institute/' + instituteId + '/get-ctr',
    ctr_delete                         : url + 'ctr/institute/' + instituteId + '/delete-ctr'
}