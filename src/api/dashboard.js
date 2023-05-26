/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/dashboard/'
module.exports = {
    revenue                               : url + 'revenue/institute/' + instituteId + '/revenue-asOf',
    sale_funel                            : url + 'salefunel/institute/' + instituteId + '/salefunel-asOf',
    sale_analysis                         : url + 'saleanalysis/institute/' + instituteId + '/saleanalysis-asOf',
    sale_payment_graph                    : url + 'salepayment-graph/institute/' + instituteId + '/salepayment-graph',
    invoice_so_graph                      : url + 'invoice-saleorder-graph/institute/' + instituteId + '/invoice-saleorder-graph',
    sale_over_credit_limit                : url + 'dashboard-saleover-creditlimit/institute/' + instituteId + '/asOf',

    total_purchase                        : url + 'dashboard-purchase/institute/' + instituteId + '/asOf',
    // vendor_purchasex_purchase_order_graph : url + 'dashboard-vendorxpense-graph/institute/' + instituteId + '/asOf',
    vendor_purchase_analysis              : url + 'vendoranalysis/institute/' + instituteId + '/vendoranalysis',
    vendor_3way_matching                  : url + 'vendormatching/institute/' + instituteId + '/vendormatching',
    vendor_over_credit_limit              : url + 'dashboard-vendorover-creditlimit/institute/' + instituteId + '/asOf',

    top_sale_item                         : url + 'top-sale-item/institute/' + instituteId + '/top-sale-item',
    product_top5_inventory_category       : url + 'top-sale-category/institute/' + instituteId + '/top-sale-category',
    product_purchase                      : url + 'product-purchase/institute/' + instituteId + '/product-purchase',
    product_sale                          : url + 'product-sale/institute/' + instituteId + '/product-sale',
    product_balance_purchase_sale_graph   : url + 'product-balance-purchase-sale/institute/' + instituteId + '/product-balance-purchase-sale',

    service_top5_service_category         : url + 'dashboard-servicetop5category/institute/' + instituteId + '/asOf',
    service_purchase                      : url + 'dashboard-servicepurchase/institute/' + instituteId + '/asOf',
    service_sale                          : url + 'dashboard-servicesale/institute/' + instituteId + '/asOf',
    service_revenue_graph                 : url + 'service-sale-by-month/institute/' + instituteId + '/service-sale-by-month',
    service_project_ratio                 : url + 'dashboard-serviceprojectratio/institute/' + instituteId + '/asOf',

    banking_graph_payment_option          : url + 'dashboard-bank-graph/institute/' + instituteId + '/asOf',
    sale_margin_analysis                  : url + 'sale-margin-analysis/institute/' + instituteId + '/sale-margin-analysis',
    sale_tax_detail                       : url + 'sale-tax/institute/' + instituteId + '/sale-tax',

    dashboard_receivable_overview              : url + 'due-thisweek/institute/' + instituteId + '/due-thisweek-asOf',
    dashboard_receivable_overview_cus          : url + 'dashboard-receivable-overview-cus/institute/' + instituteId + '/list',
    dashboard_receivable_overview_sup          : url + 'dashboard-receivable-overview-sup/institute/' + instituteId + '/list',
    top_sale_report                         : url + 'top-sale-report/institute/' + instituteId + '/top-sale-report',

    revenue_total                           : url + 'total-revenue/institute/' + instituteId + '/total-revenue'
}