/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
let baseUrl = myUrl.url
// if(process.env.VUE_APP_MODE == 'dev'){
//     baseUrl = 'https://dev-apis.banhji.com'
// }

const url          = baseUrl + '/entity-payroll-settings/'
const url_run      = baseUrl + '/entity-payrolls/'

// const url = 'https://dev-apis.banhji.com/entity-payroll-setting/'
// const url_run  = 'https://dev-apis.banhji.com/entity-payroll/'

module.exports = {
    // setting
    payroll_bank_get                            : url + 'bank/institute/' + instituteId + '/list',
    payroll_bank_post                           : url + 'bank/institute/' + instituteId + '/add',
    payroll_tax_get                             : url + 'tax/institute/' + instituteId + '/list',
    payroll_tax_post                            : url + 'tax/institute/' + instituteId + '/add',
    department_post                             : url + 'department/institute/' + instituteId + '/add',
    department_get                              : url + 'department/institute/' + instituteId + '/list',
    position_post                               : url + 'position/institute/' + instituteId + '/add',
    position_get                                : url + 'position/institute/' + instituteId + '/list',
    pay_component_post                          : url + 'pay-component/institute/' + instituteId + '/add',
    pay_component_get                           : url + 'pay-component/institute/' + instituteId + '/list',
    period_post                                 : url + 'period/institute/' + instituteId + '/add',
    period_get                                  : url + 'period/institute/' + instituteId + '/list',
    nssf_post                                   : url + 'nssf/institute/' + instituteId + '/add',
    nssf_get                                    : url + 'nssf/institute/' + instituteId + '/list',
    type_of_work_post                           : url +'type-of-work/institute/' + instituteId + '/add',
    type_of_work_get                            : url +'type-of-work/institute/' + instituteId + '/list',
    specific_work_post                          : url +'specific-work/institute/' + instituteId + '/add',
    specific_work_get                           : url +'specific-work/institute/' + instituteId + '/list',
    specific_by_type_get                        : url +'specific-by-type/institute/' + instituteId + '/list',
    leave_get                                   : url +'leave/institute/' + instituteId + '/list',
    leave_post                                  : url +'leave/institute/' + instituteId + '/add',
    prefix_post                                 : url +'payroll-prefix/institute/' + instituteId + '/add',
    prefix_get                                  : url +'payroll-prefix/institute/' + instituteId + '/list',
    group_employee_get                          : url +'group-employee/institute/' + instituteId + '/get',
    group_employee_post                         : url +'group-employee/institute/' + instituteId + '/add',

    // Run payroll
    time_card_post                               : url_run + 'timecard/institute/' + instituteId + '/add',
    time_card_get                                : url_run + 'timecard/institute/' + instituteId + '/list',
    payroll_post                                 : url_run + 'payroll/institute/' + instituteId + '/add',
    payroll_get                                  : url_run + 'payroll/institute/' + instituteId + '/list',
    payroll_by_month_get                         : url_run + 'payroll-by-month/institute/' + instituteId + '/get',
    payroll_item_get                             : url_run + 'payroll-item/institute/' + instituteId + '/list',
    payroll_list_get                             : url_run + 'payroll-list/institute/' + instituteId + '/list',
    prefix_number                                : url_run + 'prefix-number/institute/' + instituteId + '/number',
    transaction_get                              : url_run + 'transactions/institute/'+instituteId+'/get',
    transactions_list                            : url_run + 'transactions-list/institute/'+ instituteId + '/list',
    payroll_detail_get                           : url_run + 'payroll-detail/institute/' + instituteId + '/list',
    tax_pay_get                                  : url_run + 'tax-pay/institute/' + instituteId + '/get',
    payroll_summary_get                          : url_run + 'payroll-summary/institute/' + instituteId + '/list',
    payroll_liabilites_get                       : url_run + 'payroll-liabilites/institute/' + instituteId + '/list',
    payroll_tax_list_get                         : url_run + 'payroll-tax/institute/' + instituteId + '/list',
    payroll_employee_get                         : url_run + 'payroll-employee/institute/' + instituteId + '/list',
    payroll_timesheet_get                        : url_run + 'payroll-timesheet/institute/' + instituteId + '/list',
    payroll_previous_get                         : url_run + 'payroll-previous/institute/' + instituteId + '/get',

    // payroll payment 
    payment_post                                 : url_run + 'payment/institute/' + instituteId + '/add',
    payment_get                                  : url_run + 'payment/institute/' + instituteId + '/list',
    payment_single_get                           : url_run + 'payment/institute/' + instituteId + '/get',
    payment_batch_post                           : url_run + 'payment-batch/institute/' + instituteId + '/add',
    payment_batch_list                           : url_run + 'payment-batch/institute/' + instituteId + '/list',
    payment_item_get                             : url_run + 'payment-item/institute/' + instituteId + '/list',
    batch_single_get                             : url_run + 'payment-batch/institute/' + instituteId + '/get',
    employee_to_pay                              : url_run + 'employee-to-pay/institute/' + instituteId + '/get',
    total_payment                                : url_run + 'payment-dashboard/institute/' + instituteId + '/get',
    payroll_chart                                : url_run + 'payroll-chart/institute/' + instituteId + '/get',
    payroll_day_to_pay                           : url_run + 'payroll-day-to-pay/institute/' + instituteId + '/get',
    payroll_tax_payment                          : url_run + 'payroll-tax-payment/institute/' + instituteId + '/get',
    payroll_journal                              : url_run + 'journal/institute/' + instituteId + '/get',

    // delete
    payroll_delete                              : url_run + 'delete-transactions/institute/' + instituteId + '/delete',
}