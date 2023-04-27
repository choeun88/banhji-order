const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies
const myUrl = require("@/url")
let baseUrl = myUrl.url
// if(process.env.VUE_APP_MODE == 'dev'){
//     baseUrl = 'https://dev-apis.banhji.com'
// }
const url          = baseUrl + '/transaction-billing/'
// window.console.log('base url' + baseUrl , 'url'+ url)
module.exports = {
    invoice_post                               : url + 'invoice/institute/' + instituteId + '/add',
    receipt_post                               : url + 'receipt/institute/' + instituteId + '/add',
    invoice_schedule                           : url + 'invoice/institute/' + instituteId + '/schedule',
    invoice_get                                : url + 'invoice/institute/' + instituteId + '/list',
    invoice_history                            : url + 'invoice/institute/' + instituteId + '/history',
    number_post                                : url + 'number/institute/'  + instituteId + '/last',
    invoice_link_get                           : url + 'invoice/institute/' + instituteId + '/link',
    recurring_invoice_post                     : url + 'recurring/institute/' + instituteId + '/add',
    recurring_invoice_get                      : url + 'recurring/institute/' + instituteId + '/list',
    invoice_search_post                        : url + 'invoice/institute/' + instituteId + '/search',
    customer_invoice_get                       : url + 'invoice/institute/' + instituteId ,
    cash_receipt_get                           : url + 'txn/institute/' + instituteId + '/list',
    wcp_receivable_get                         : url + 'wcp-receivable/institute/' + instituteId + '/list',
    wcp_payable_get                            : url + 'wcp-payable/institute/' + instituteId + '/list',
    wcp_receivable_aging_get                   : url + 'wcp-receivable-aging/institute/' + instituteId + '/list',
    wcp_payable_aging_get                      : url + 'wcp-payable-aging/institute/' + instituteId + '/list',
    wcp_receivable_creditLimit_get             : url + 'wcp-receivable-creditlimit/institute/' + instituteId + '/list',
    wcp_payable_creditLimit_get                : url + 'wcp-payable-creditlimit/institute/' + instituteId + '/list',
    wcp_overview_get                           : url + 'wcp-overview/institute/' + instituteId + '/list',
    deposit_post                               : url + 'deposit/institute/' + instituteId + '/add',
    deposit_list                               : url + 'deposit/institute/' + instituteId + '/list',
    deposit_balance_list                       : url + 'deposit-balance/institute/' + instituteId + '/list',
    purchase_deposit_balance_list              : url + 'purchase-deposit/institute/' + instituteId + '/balance',
    txn_item_get                               : url + 'txn-item/institute/' + instituteId + '/',
    credit_memo_post                           : url + 'credit-memo/institute/' + instituteId + '/add',
    debit_memo_post                            : url + 'debit-memo/institute/' + instituteId + '/add',
    credit_memo_get                            : url + 'credit-memo/institute/' + instituteId + '/list',
    debit_memo_get                             : url + 'debit-memo/institute/' + instituteId + '/list',
    purchase_deposit_post                      : url + 'purchase-deposit/institute/' + instituteId + '/add',
    purchase_deposit_get                       : url + 'purchase-deposit/institute/' + instituteId + '/list',

    purchase_post                              : url + 'purchase/institute/' + instituteId + '/add',
    purchase_get                               : url + 'purchase/institute/' + instituteId + '/list',
    cash_payment_search_post                   : url + 'cash-payment/institute/' + instituteId + '/search',
    cash_payment_post                          : url + 'cash-payment/institute/' + instituteId + '/add',
    cash_payment_get                           : url + 'txn-cash-payment/institute/' + instituteId + '/list',

    expense_post                               : url + 'expense/institute/' + instituteId + '/add',
    expense_batch                              : url + 'expense/institute/' + instituteId + '/batch',
    inventory_list_by_function                 : url + 'inventory/institute/' + instituteId + '/list',
    inventory_purchase_cost                    : url + 'inventory-item/institute/' + instituteId + '/list',
    inventory_balance                          : url + 'inventory-balance/institute/' + instituteId + '/list',
    inventory_adjustment_post                  : url + 'inventory-adjustment/institute/' + instituteId + '/add',
    inventory_adjustment_list                  : url + 'inventory-adjustment/institute/' + instituteId + '/list',
    dashboard_receivable_overview              : url + 'dashboard-receivable-overview/institute/' + instituteId + '/list',
    dashboard_receivable_overview_cus          : url + 'dashboard-receivable-overview-cus/institute/' + instituteId + '/list',
    dashboard_receivable_overview_sup          : url + 'dashboard-receivable-overview-sup/institute/' + instituteId + '/list',
    wcp_payable_overview_get                   : url + 'wcp-payable-overview/institute/' + instituteId + '/list',
    balance_summary_get                        : url + 'balance/institute/' + instituteId + '/list',
    customer_txn                               : url + 'customer-txn/institute/' + instituteId + '/list',
    attachment_post                            : url + 'attachment/institute/' + instituteId + '/add',
    attachment_gets                            : url + 'attachment/institute/' + instituteId + '/list',

    deposit_balance_summary                    : url + 'deposit-balance-summary/institute/' + instituteId + '/list',
    vendor_txn                                 : url + 'vendor-txn/institute/' + instituteId + '/list',

    request_payment_post                       : url + 'request-payment/institute/' + instituteId + '/add',
    request_payment_list                       : url + 'request-payment/institute/' + instituteId + '/list',

    payment_option_report                      : url + 'payment-option/institute/' + instituteId + '/list',
    payment_term_report                        : url + 'payment-term-report/institute/' + instituteId + '/list',
}