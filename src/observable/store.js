import Vue from 'vue'
export const data =  Vue.observable({
    name:{
        lastname: 'Loat',
        firstname: 'Choeun'
    },
    show: false,
    resources: '',
    keyword:'',
    customer_tab_main:1,
    customer_tab_sub:0,
    order_report_tab_main:0,
    order_report_tab_sub:0,
    sale_report_tab_main:0,
    sale_report_tab_sub:0,
    product_tab_main:0,
    product_tab_sub:0,
    budget_tab_main:1,
    budget_tab_sub:0,
    payroll_tab_main:1,
    service_tab_main: 0,
    accounting_tab_main: 1,
    banking_tab_main: 1,
    funding_tab_main: 1,
    compliance_main_tab: 1,
    pricing_tab_main:0,
    pos_tab_main:0,
    pos_tab_sub:0,
    session_tab_main:0,
    session_tab_sub:0,
})
export const dataStore =  Vue.observable({
    productType: '',
    isValidUser: true,
    company: {},
    businessType: 'Service',
    publick_inv_link : '',
    roles: [],
    roleData: [],
    roleType: 0
})
export const ShowResource = (key) =>{
    data.show = true
    data.keyword =  key
}
export const setTabActive = (main,sub) =>{
   data.customer_tab_main = main
   data.customer_tab_sub  = sub
}
export const hideResource = () =>{
    data.show = false
    data.resources = ''
}
export const setTabActiveVendor  = (main,sub) =>{
    data.vendor_tab_main = main
    data.vendor_tab_sub  = sub
}
export const setTabActiveBudget  = (main,sub) =>{
    data.budget_tab_main = main
    data.budget_tab_sub  = sub
 }
export const setTabActivePricing  = (main,sub) =>{
    data.pricing_tab_main = main
    data.pricing_tab_sub  = sub
}
export const setTabOrderReport  = (main,sub) =>{
    data.order_report_tab_main = main
    data.order_report_tab_sub  = sub
}
export const setTabSaleReport  = (main,sub) =>{
    data.sale_report_tab_main = main
    data.sale_report_tab_sub  = sub
}
export const setTabPos  = (main,sub) =>{
    data.pos_tab_main = main
    data.pos_tab_sub  = sub
}
export const setTabSession  = (main,sub) =>{
    data.session_tab_main = main
    data.session_tab_sub  = sub
}


