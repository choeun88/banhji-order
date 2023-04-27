const axios = require('axios')
const apiUrl = require('@/apiUrl')

// List invoice-by-customer
module.exports.byCustomer = async function (strFilter = '') { // customer id
    try {
        return await axios.get(apiUrl.billing.customer_invoice_get + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// // Customer last balance
// module.exports.balance = async function (id) { // customer id
//     try {
//         const response = await axios.get(apiUrl.billing.customer_invoice_get + '/customer/' + id)
//         return response
//     } catch (error) {
//         window.console.error(error)
//     }
// }

// List
module.exports.list = async function (params) {
    try {
        let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.invoice_get + '/' + strFilter)
        // } else {
        //     response = await axios.get(apiUrl.billing.invoice_get)
        // }
        response = await axios.post(apiUrl.billing.invoice_get, params)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List get receivab;e balance detail 
module.exports.wcpReceivableList = async function (strFilter = '') {
    try {
        // let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.wcp_receivable_get + '/' + strFilter)
        // } else {
        //     response = await axios.get(apiUrl.billing.wcp_receivable_get)
        // }
        return await axios.post(apiUrl.billing.wcp_receivable_get, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.wcpPayableList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.wcp_payable_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.wcp_payable_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List receivable Aging
module.exports.wcpReceivableAgingList = async function (strFilter) {
    try {
        // let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.wcp_receivable_aging_get + '/' + strFilter)
        // } else {
        //     response = await axios.get(apiUrl.billing.wcp_receivable_aging_get)
        // }
        return await axios.post(apiUrl.billing.wcp_receivable_aging_get, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// List Payable Aging
module.exports.wcpPayableAgingList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.wcp_payable_aging_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.wcp_payable_aging_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.expectedDue = async function (strFilter) {
    try {
        return await axios.get(apiUrl.billing.wcp_overview_get + '/' + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// List wcp receivable credit limit
module.exports.wcpReceivableCreditLimitList = async function (strFilter) {
    try {
        return await axios.post(apiUrl.billing.wcp_receivable_creditLimit_get, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// List wcp payable credit limit
module.exports.wcpPayableCreditLimitList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.wcp_payable_creditLimit_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.wcp_payable_creditLimit_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// txn Cash Receipt List
module.exports.txn = async function (params = '') {
    try {
        // let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.cash_receipt_get + '/' + strFilter)
        // } else {
        //     response = 
        // }
        return await axios.post(apiUrl.billing.cash_receipt_get, params)
    } catch (error) {
        window.console.error(error)
    }
}
// txn Cash Payment List
module.exports.txnCashPayment = async function (strFilter) {
    try {
        // let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.cash_payment_get + '/' + strFilter)
        // } else {
        //     response = await axios.get(apiUrl.billing.cash_payment_get)
        // }
        return await axios.post(apiUrl.billing.cash_payment_get, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// Cash Receipt View one
module.exports.txnView = async function (id) {
    try {
        return await axios.get(apiUrl.billing.cash_receipt_get + '/' + id)
    } catch (error) {
        window.console.error(error)
    }
}
// History List
module.exports.history = async function (id) {
    try {
        const response = await axios.get(apiUrl.billing.invoice_history + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Create Schedule
module.exports.schedule = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.invoice_schedule, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// view
module.exports.view = async function (id) {
    try {
        const response = await axios.get(apiUrl.billing.invoice_get + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}


// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.invoice_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save payment schedule
module.exports.scheduleList = async (id) => {
    try {
        const response = await axios.get(apiUrl.billing.invoice_schedule + '/' + id)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Last Number
module.exports.lastNumber = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.number_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// invoice link view
module.exports.linkView = async function (id) {
    try {
        const response = await axios.get(apiUrl.billing.invoice_link_get + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Cash Receipt Search Invoice
module.exports.search = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.invoice_search_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Cash Payment Search
module.exports.searchCashPayment = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.cash_payment_search_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Receipt create
// save
module.exports.createReceipt = async (data) => {
    try {
        return await axios.post(apiUrl.billing.receipt_post, data)
    } catch (error) {
        window.console.log(error)
    }
}
// Cash Payment create
// save
module.exports.createCashPayment = async (data) => {
    try {
        return await axios.post(apiUrl.billing.cash_payment_post, data)
    } catch (error) {
        window.console.error(error)
    }
}
// Deposit create
// save
module.exports.createDeposit = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.deposit_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Credit Memo
// save
module.exports.createCreditMemo = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.credit_memo_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Credit Memo
// List All By date
// list?id= ' ' get one
module.exports.creditMemoList = async (strFilter) => {
    try {
        const response = await axios.get(apiUrl.billing.credit_memo_get + strFilter)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Deposit transaction List
module.exports.depositList = async (strFilter) => {
    try {
        return await axios.post(apiUrl.billing.deposit_list, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// List
module.exports.depositBalanceList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.deposit_balance_list + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.deposit_balance_list)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// txn By Item
module.exports.txnItem = async function (itemId) {
    try {
        const response = await axios.get(apiUrl.billing.txn_item_get + itemId + '/list')
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Supplier Deposit create
// save
module.exports.createPurchaseDeposit = async (data) => {
    try {
        return await axios.post(apiUrl.billing.purchase_deposit_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

// Supplier Deposit List
module.exports.purchaseDepositBalanceList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.purchase_deposit_balance_list + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.purchase_deposit_balance_list)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Purchase Deposit transaction List
module.exports.purchaseDepositList = async (strFilter) => {
    try {
        return await axios.post(apiUrl.billing.purchase_deposit_get, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// Purchase
// save
module.exports.createPurchase = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.purchase_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List Purchase
module.exports.listPurchase = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.billing.purchase_get, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// view
module.exports.viewPurchase = async function (id, strFilter = '') {
    try {
        const response = await axios.get(apiUrl.billing.purchase_get + '/' + id + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}


// Expense
// save
module.exports.createExpense = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.expense_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Expense batch
// save
module.exports.createExpenseBatch = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.expense_batch, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Debit Memo
// save
module.exports.createDebitMemo = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.debit_memo_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Credit Memo
// List All By date
// list?id= ' ' get one
module.exports.debitMemoList = async (strFilter = '') => {
    try {
        return await axios.post(apiUrl.billing.debit_memo_get, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// Inventory List By functions
module.exports.inventoryListByFunction = async function (strFilter = '') {
    try {
        // let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.inventory_list_by_function + '/' + strFilter)
        // } else {
        //     response = await axios.get(apiUrl.billing.inventory_list_by_function)
        // }
        return await axios.post(apiUrl.billing.inventory_list_by_function, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// Inventory item last purchase cost
module.exports.inventoryItemPurchaseCost = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.inventory_purchase_cost + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.inventory_purchase_cost)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Inventory balance asf
module.exports.inventoryBalance = async function (strFilter = '') {
    try {
        // let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.inventory_balance + '/' + strFilter)
        // } else {
        //     response = await axios.get(apiUrl.billing.inventory_balance)
        // }
        return await axios.post(apiUrl.billing.inventory_balance, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// Inventory adjustment
// save
module.exports.inventoryAdjustment = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.inventory_adjustment_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Inventory adjustment
// list
module.exports.inventoryAdjustmentList = async (strFilter = '') => {
    try {
        // let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.inventory_adjustment_list + '/' + strFilter)
        // } else {
        //     response = 
        // }
        return await axios.post(apiUrl.billing.inventory_adjustment_list, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// wcp payable overview Amount to Pay
module.exports.wcpPableOverviewList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.wcp_payable_overview_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.wcp_payable_overview_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Customer Transactions
module.exports.customerTxn = async function (strFilter) {
    try {
        // let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.customer_txn + '/' + strFilter)
        // } else {
        //     response = await axios.get(apiUrl.billing.customer_txn)
        // }
        return await axios.post(apiUrl.billing.customer_txn, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// Vendor Transactions
module.exports.vendorTxn = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.vendor_txn + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.vendor_txn)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Customer attachment File
module.exports.attachment = async function (data) {
    try {
        const response = await axios.post(apiUrl.billing.attachment_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Customer Attachment List
module.exports.attachmentList = async function (strFilter) {
    try {
        const response = await axios.get(apiUrl.billing.attachment_gets + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.attachmentDelete = async function (val) {
    try {
        const response = await axios.delete(apiUrl.billing.attachment_delete, {
            params: {
                id: val.id,
                key: val.key
            }
        })

        return response
    } catch (error) {
        window.console.error(error)
    }
}

//Todo: vendor/customer balance summary
// Deposit balance asOf
module.exports.balanceSummary = async function (strFilter = '') {
    try {
        // let response = []
        // if (strFilter !== undefined) {
        //     response = await axios.get(apiUrl.billing.deposit_balance_summary + '/' + strFilter)
        // } else {
        //     response = await axios.get(apiUrl.billing.deposit_balance_summary)
        // }
        return await axios.post(apiUrl.billing.balance_summary, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// Request Payment create
// save
module.exports.createRequestPayment = async (data) => {
    try {
        return await axios.post(apiUrl.billing.request_payment_post, data)
    } catch (error) {
        window.console.error(error)
    }
}
//Todo: Request List
module.exports.requestPaymentList = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.billing.request_payment_list, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

//Todo: payment_option_report
module.exports.paymentOptionReport = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.billing.payment_option_report, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// Expense View get purchase reFrom / refTo
module.exports.expenseView = async function (strFilter = '') {
    try {
        return await axios.get(apiUrl.billing.expense_view + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
//Search Customer reference number
module.exports.customerReferenceNumberURL = function () {
    try {
        return apiUrl.billing.customer_invoice_get
    } catch (error) {
        window.console.error(error)
    }
}
//Search Customer reference number
module.exports.customerReferenceNumber =  async function (strFilter = '') {
    try {
        return await axios.get(apiUrl.billing.customer_invoice_get + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// Invoice upload
module.exports.upload = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.upload, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Variant conversion
// save
module.exports.variantConversion = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.variant_conversion_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Variant conversion
// save
module.exports.variantConversionList = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.variant_conversion_gets, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Production
// save
module.exports.production = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.production_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Production list
// save
module.exports.productionList = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.production_gets, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}