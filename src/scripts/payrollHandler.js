const axios = require('axios')
const apiUrl = require('../apiUrl.js')


// List
module.exports.getBank = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_bank_get)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.createBank = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.payroll_bank_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTax = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_tax_get)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createTax = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.payroll_tax_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createDepartment = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.department_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getDepartment = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.department_get,{
            params: {
                'location_id':      val.location_id || '',
            }
        })
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createPosition = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.position_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPosition = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.position_get)
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createComponent = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.pay_component_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getComponent = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.pay_component_get)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createPeriod = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.period_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPeriiod = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.period_get)
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createNSSF = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.nssf_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getNSSF = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.nssf_get)
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createTypeOfWork = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.type_of_work_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTypeOfWork = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.type_of_work_get)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createSpecificWork = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.specific_work_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getSpecificWork = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.specific_work_get)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getSpecificByType = async (id) => {
    try {
        const response = await axios.get(apiUrl.payroll.specific_by_type_get + `/${id}`)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getLeave = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.leave_get)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createLeave = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.leave_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPrefix = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.prefix_get)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getGroup = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.group_employee_get)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createGroup = async (data) =>{
    
    try {
        const response = await axios.post(apiUrl.payroll.group_employee_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createPrefix = async (data) =>{
    
    try {
        const response = await axios.post(apiUrl.payroll.prefix_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Run Payroll
module.exports.createPayroll = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.payroll_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayroll = async (payroll_id) => {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_get + `/${payroll_id}`)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollByMonth = async (monthOf) => {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_by_month_get,{
            params:{
                monthOf: monthOf
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollItem = async (payroll_id) => {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_item_get + `/${payroll_id}`)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollList = async (param) => {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_list_get,{
            params: {
                'monthOf':      param.monthOf,
                'employee_id':  param.employee_id
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createJournal = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.payroll_journal_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPrefixNumber = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.prefix_number, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createTimeCard = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.time_card_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTimeCard = async function (param) {
    try {
        const response = await axios.get(apiUrl.payroll.time_card_get,{
            params: {
                'monthOf': param.monthOf,
                'selectTime': param.selectTime
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.urlPayroll = function () {
    try {
        return apiUrl.payroll.payroll_list_get
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollPrevious = async (monthOf) => {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_previous_get,{
            params: {
                'monthOf':      monthOf,
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// payroll payment
module.exports.getTransaction = async function (param) {
    try {
        const response = await axios.get(apiUrl.payroll.transaction_get,{
            params: {
                'employeeUuid': param.employeeUuid,
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTransactionList = async function (param) {
    try {
        const response = await axios.get(apiUrl.payroll.transactions_list,{
            params:{
                payDate: param.payDate
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollDetail = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_detail_get,{
            params:{
                'employeeUuid': val.employeeUuid,
                'end_date': val.end_date,
                'start_date': val.start_date
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTaxpay = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.tax_pay_get,{
            params:{
                'end_date': val.end_date,
                'start_date': val.start_date
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollSummary = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_summary_get,{
            params:{
                'start_date': val.start_date,
                'end_date': val.end_date
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollLiabilites = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_liabilites_get,{
            params:{
                'start_date': val.start_date,
                'end_date': val.end_date
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollTaxList = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_tax_list_get,{
            params:{
                'start_date': val.start_date,
                'end_date': val.end_date
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollEmployee = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_employee_get,{
            params:{
                'start_date':   val.start_date,
                'end_date':     val.end_date,
                'employeeUid': val.employeeUid,
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollTimesheet = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_timesheet_get,{
            params:{
                'start_date': val.start_date,
                'end_date': val.end_date
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createPayment = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.payment_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayment = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payment_get,{
            params:{
                'start_date': val.start_date,
                'end_date': val.end_date
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPaymentSingle = async function (id) {
    try {
        const response = await axios.get(apiUrl.payroll.payment_single_get + `/${id}`)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createBatchPayment = async (data) => {
    try {
        const response = await axios.post(apiUrl.payroll.payment_batch_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getBatchPaymentList = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payment_batch_list,{
            params:{
                'start_date': val.start_date,
                'end_date': val.end_date
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getBatchSingle = async function (id) {
    try {
        const response = await axios.get(apiUrl.payroll.batch_single_get + `/${id}`)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getBatchItem = async function (id) {
    try {
        const response = await axios.get(apiUrl.payroll.payment_item_get + `/${id}`)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmployeeToPay = async function () {
    try {
        const response = await axios.get(apiUrl.payroll.employee_to_pay)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTotalPayment = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.total_payment,{
            params:{
                'start_date': val.start_date,
                'end_date': val.end_date
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPaymentChart = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_chart,{
            params:{
                'start_date': val.start_date,
                'end_date': val.end_date
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getDayToPay = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_day_to_pay,{
            params:{
                'start_date': val,
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTaxPayment = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_tax_payment,{
            params:{
                'start_date': val.start_date,
                'end_date': val.end_date
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.deleteTransactions = async function (val) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_delete,{
            params:{
                'payroll_id': val,
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getPayrollJournal = async function (id) {
    try {
        const response = await axios.get(apiUrl.payroll.payroll_journal + `/${id}`)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}