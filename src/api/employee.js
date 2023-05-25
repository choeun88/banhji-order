/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
let baseUrl = myUrl.url
// if(process.env.VUE_APP_MODE == 'dev'){
//     baseUrl = 'https://dev-apis.banhji.com'
// }
const url          = baseUrl + '/entity-payroll-employees/'
// const url          = 'https://dev-apis.banhji.com/entity-payroll-employee/'

module.exports = {
    employee_post                               : url + 'employee/institute/' + instituteId + '/add',
    employee_center                             : url + 'employee/institute/' + instituteId + '/center',
    employee_getOne                             : url + 'employee/institute/' + instituteId + '/list/',
    employee_search                             : url + 'employee/institute/' + instituteId + '/search',
    employment_record_post                      : url + 'employment-record/institute/' + instituteId + '/add',
    record_by_employee_get                      : url + 'record-by-employee/institute/'+ instituteId + '/get',
    record_list_by_employee_get                 : url + 'record-list-by-employee/list',
    record_get                                  : url + 'record/institute/' + instituteId + '/list',
    timesheet_post                              : url + 'timesheet/institute/' + instituteId + '/add',
    timesheet_get                               : url + 'timesheet/institute/' + instituteId + '/list',
    timesheet_single                            : url + 'timesheet-single/institute/' + instituteId + '/list',
    transactions                                : url + 'employee-transaction/institute/' + instituteId + '/list',
    employee_info                               : url + 'employee-info/institute/' + instituteId + '/get',
    employee_dashboard                          : url + 'employee-dashboard/institute/' + instituteId + '/get',
    employee_balance                            : url + 'employee-balance/institute/' + instituteId + '/get',
    employee_leave                              : url + 'employee-leave/institute/' + instituteId + '/get',
    leave_summary                               : url + 'leave-summary/institute/' + instituteId + '/get',
    employee_benefit                            : url + 'fringe-benefit/institute/' + instituteId + '/add',
    employee_benefit_get                        : url + 'fringe-benefit/institute/' + instituteId + '/get',
    employee_update                             : url + 'employee/institute/' + instituteId + '/update/',
    last_number_get                             : url + 'employee-lastnumber/institute/' + instituteId + '/get',
    analy_specifice_get                         : url + 'analy-specifice/institute/' + instituteId + '/get',
    analy_project_get                           : url + 'analy-project/institute/' + instituteId + '/get'
}