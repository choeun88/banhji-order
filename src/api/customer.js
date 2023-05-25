/* Cookie */
const cookieJS = require('@/cookie.js')
const { instituteId } = cookieJS.getCookie()

const myUrl = require('@/url')
const baseUrl = myUrl.url
const url = baseUrl + '/entity-customer/'
const urlEnity = baseUrl + '/entity-setting/'

// const url          = 'https://dev-apis.banhji.com/entity-customers/'
// const wcapSettingUrl    = 'https://7m0h9en2s3.execute-api.ap-southeast-1.amazonaws.com/dev/v1/wcapsettings/'

module.exports = {
  customer_post: url + 'customer/institute/' + instituteId + '/add',
  customer_get: url + 'customer/institute/' + instituteId + '/list',
  customer_getOne: url + 'customer/institute/' + instituteId + '/list/',
  customer_search: url + 'customer-v1/institute/' + instituteId + '/search',
  customer_center: url + 'customer/institute/' + instituteId,
  customer_centerv1: url + 'customer-v1/institute/' + instituteId + '/center',
  customer_directory: url + 'customer/institute/' + instituteId + '/directory',
  customer_put: url + 'customer/institute/' + instituteId + '/update',
  // customer type setting
  customer_type_post: url + 'custype/institute/' + instituteId + '/add',
  customer_type_get: url + 'custype/institute/' + instituteId + '/list',
  customer_type_put: url + 'custype/institute/' + instituteId + '/update/',
  customer_nature_get: url + 'customer-nature/institute/' + instituteId + '/list',
  // customer group setting
  customer_group_post: url + 'cusgroup/institute/' + instituteId + '/add',
  customer_group_get: url + 'cusgroup/institute/' + instituteId + '/list',
  customer_group_put: url + 'cusgroup/institute/' + instituteId + '/update/',
  // wcap_setting_get                            : wcapSettingUrl + 'institute/' + instituteId + '/type/',
  sale_channel_post: url + 'sale-channel/institute/' + instituteId + '/add',
  sale_channel_get: url + 'sale-channel/institute/' + instituteId + '/list',

  project_post: url + 'customer-project/institute/' + instituteId + '/add',
  project_get: url + 'customer-project/institute/' + instituteId + '/list',
  project_by_customer_get: url + 'customer-project/institute/' + instituteId + '/customer/',
  project_by_supplier_get: url + 'customer-project/institute/' + instituteId + '/supplier/',

  sale_form_content_post: url + 'sale-form-content/institute/' + instituteId + '/add',
  sale_form_content_get: url + 'sale-form-content/institute/' + instituteId + '/list',
  form_content_post: urlEnity + 'form-content/institute/' + instituteId + '/add',
  form_content_get: urlEnity + 'form-content/institute/' + instituteId + '/get',
  // lead
  lead_post: url + 'lead/institute/' + instituteId + '/add',
  lead_get: url + 'lead/institute/' + instituteId + '/list',
  lead_getOne: url + 'lead/institute/' + instituteId + '/list/',
  customer_project_report: url + 'customer-project-txn/institute/' + instituteId + '/list',
  customer_project_report_summary: url + 'customer-project-summary/institute/' + instituteId + '/customer-project-summary',
  customer_project_completion: url + 'customer-project/institute/' + instituteId + '/update',

  // Credit Limit
  customer_credit_limit_post: url + 'credit-limit/institute/' + instituteId + '/add',
  customer_credit_limit_get: url + 'credit-limit/institute/' + instituteId + '/list',
  customer_credit_usage_get: url + 'credit-limit/institute/' + instituteId + '/usage',

  // Payment Term
  customer_term_post: url + 'payment-term/institute/' + instituteId + '/add',
  customer_term_get: url + 'payment-term/institute/' + instituteId + '/list',
  // report
  payment_term_report: url + 'payment-term-report/institute/' + instituteId + '/payment-term-report',
  importCreate: url + 'import-customer/institute/' + instituteId + '/add',
  importVendorCreate: url + 'importvendor/institute/' + instituteId + '/add',
  importEmpCreate: url + 'importemp/institute/' + instituteId + '/add',
  importServiceCreate: url + 'importservice/institute/' + instituteId + '/add',
  importSaleUnitCreate: url + 'importsaleunit/institute/' + instituteId + '/add',

  has_txn: url + 'has-txn/institute/' + instituteId + '/check',

  customer_lastNumber: url + 'last-number/institute/' + instituteId + '/last',

  // funding
  funding_post: url + 'funding/institute/' + instituteId + '/add',
  funding_get: url + 'funding/institute/' + instituteId + '/get',

  customer_searchv1: url + 'customer-v1/institute/' + instituteId + '/search',
  customer_linev1: url + 'customer-v1/institute/' + instituteId + '/customer-detail',

  standard_cost_list: url + 'standard-cost-option/institute/' + instituteId + '/standard-cost-option',
  standard_cost_post: url + 'standard-cost-option/institute/' + instituteId + '/standard-cost-option-add',
  sub_of_customer_get: url + 'sub-of-customer/'
}
