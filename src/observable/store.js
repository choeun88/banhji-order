import Vue from 'vue'
import FormContentModel from '@/scripts/model/FormContent'
const formContentModel = new FormContentModel({})
export const data = Vue.observable({
  name: {
    lastname: 'Chhin',
    firstname: 'Chhai'
  },
  show: false,
  resources: '',
  keyword: '',
  customer_tab_main: 1,
  customer_tab_sub: 0,
  customer_tab_sub2: 0,
  customer_tab_setting: 0,
  vendor_tab_main: 1,
  vendor_tab_sub: 0,
  vendor_tab_sub2: 0,
  product_tab_main: 1,
  product_tab_sub: 0,
  bank_tab_main: 1,
  bank_tab_sub: 0,
  payroll_tab_main: 1,
  payroll_tab_sub: 0,
  service_tab_main: 1,
  accounting_tab_main: 1,
  funding_tab_main: 1,
  compliance_main_tab: 1,
  partDirectoryCustomer: 0,
  partDirectoryVendor: 0,
  partDirectoryPayroll: 0
})
export const dataStore = Vue.observable({
  productType: '',
  plansNotAccess: [],
  isValidUser: true,
  company: {},
  businessType: 'Service',
  publick_inv_link: '',
  roles: [],
  roleData: [],
  roleAccount: [],
  roleType: 0,
  x_rate: {},
  watch_x_rate: true,
  user: {},
  institute: 0,
  formContent: formContentModel,
  saleFormContent: {
    accountReceivable: false,
    saleChannel: false,
    lateFeeOpt: false
  },
  standardCost: {
    standardCost: 'auto'
  },
  haveAnotherDevice: false,
  receivableBalanceRp: {},
  payableBalanceRp: {}
})
export const ShowResource = (key) => {
  data.show = true
  data.keyword = key
}
export const setTabActive = (main, sub, sub2) => {
  data.customer_tab_main = main

  if (sub === 30) {
    data.customer_tab_setting = 4
  } else {
    data.customer_tab_sub = sub
  }
  if (sub2 !== undefined) {
    data.customer_tab_sub2 = sub2
  }
}
export const hideResource = () => {
  data.show = false
  data.resources = ''
}
export const setTabActiveVendor = (main, sub, sub2) => {
  data.vendor_tab_main = main
  if (sub === 10) {
    data.partDirectoryVendor = 1
    return
  }
  data.vendor_tab_sub = sub
  if (sub2 !== undefined) {
    data.vendor_tab_sub2 = sub2
  }
}
export const setTabActivePayroll = (main, sub) => {
  data.payroll_tab_main = main
  if (sub === 10) {
    data.partDirectoryPayroll = 1
    return
  }
  data.payroll_tab_sub = sub
}
export const setTabActiveBank = (main, sub) => {
  data.bank_tab_main = main
  data.bank_tab_sub = sub
}
export const setPartDirectoryCustomers = (main, val) => {
  data.customer_tab_main = main
  data.partDirectoryCustomer = val
}

export const getRate = () => {
  data.watch_x_rate = false
}