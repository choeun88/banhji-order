const axios = require('axios')
const apiUrl = require('@/apiUrl')

// Payment with tax
module.exports.paymentWithTax = async (data) => {
    try {
        // window.console.log('billing_report', apiUrl.billing_report.payment_with_tax)
        return await axios.post(apiUrl.billing_report.payment_with_tax, data)
    } catch (error) {
        window.console.error(error)
    }
}

// Cash receipt by item
module.exports.cashReceiptByItem = async (data) => {
    try {
        return await axios.post(apiUrl.billing_report.cash_receipt_by_item, data)
    } catch (error) {
        window.console.error(error)
    }
}
// Late fee report
module.exports.lateFeeReport = async (data) => {
    try {
        return await axios.post(apiUrl.billing_report.late_fee_report, data)
    } catch (error) {
        window.console.error(error)
    }
}
// Product summary report
module.exports.productSummaryReport = async (data) => {
    try {
        return await axios.post(apiUrl.billing_report.product_summary_report, data)
    } catch (error) {
        window.console.error(error)
    }
}
// Product detail report
module.exports.productDetailReport = async (data) => {
    try {
        return await axios.post(apiUrl.billing_report.product_detail_report, data)
    } catch (error) {
        window.console.error(error)
    }
}
// Import log
module.exports.importLog = async (data) => {
    try {
        return await axios.post(apiUrl.billing_report.import_log, data)
    } catch (error) {
        window.console.error(error)
    }
}