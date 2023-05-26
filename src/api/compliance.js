/*
 * Last modified : 3/25/21, 3:49 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-compliance/'

// const url          = 'https://dev-apis.banhji.com/entity-compliances/'
module.exports = {
  prefix_get                     : url + 'institute/' + instituteId + '/prefix/function/',
  number_post                   : url + 'number/institute/'  + instituteId + '/last',
  monthly_return_post           : url + 'monthly-return/institute/' + instituteId + '/add',
  monthly_return_delete         : url + 'monthly-return/institute/' + instituteId + '/delete/',
  monthly_return_get            : url + 'monthly-return/institute/' + instituteId + '/list',
  sale_post                     : url + 'sale/institute/' + instituteId + '/add',
  sale_get                      : url + 'sale/institute/' + instituteId + '/list',
  sale_getByMrId                : url + 'sale/institute/' + instituteId + '/',
  purchase_post                 : url + 'purchase/institute/' + instituteId + '/add',
  purchase_get                  : url + 'purchase/institute/' + instituteId + '/list',
  purchase_getByMrId            : url + 'purchase/institute/' + instituteId + '/',
  withholdingTax_post           : url + 'withholding-tax/institute/' + instituteId + '/add',
  withholdingTax_get            : url + 'withholding-tax/institute/' + instituteId + '/list',
  withholdingTax_getByMrId      : url + 'withholding-tax/institute/' + instituteId + '/',
  txn_ppi_post                  : url + 'ppi-txn/institute/' + instituteId + '/add',
  ppi_get                       : url + 'ppi/institute/' + instituteId + '/list',
  bal_ppi_get                   : url + 'ppi-bal/list/',
  txn_vat_post                  : url + 'vat-txn/institute/' + instituteId + '/add',
  vat_get                       : url + 'vat/institute/' + instituteId + '/list',
  bal_vat_get                   : url + 'vat-bal/list/',
  summary_post                  : url + 'summary/institute/' + instituteId + '/add',
  summary_get                   : url + 'summary/institute/' + instituteId + '/list',
  tax_agent_post                : url + 'tax-agent/institute/' + instituteId + '/add',
  tax_agent_get                 : url + 'tax-agent/institute/' + instituteId + '/list',
  salary_post                   : url + 'salary/institute/' + instituteId + '/add',
  salary_get                    : url + 'salary/institute/' + instituteId + '/list',
  salary_getByMrId              : url + 'salary/institute/' + instituteId + '/',
  tax_payment_post              : url + 'tax-payment/institute/' + instituteId + '/add',
  tax_payment_get               : url + 'tax-payment/institute/' + instituteId + '/list',
  monthly_return_journal_post   : url + 'monthly-return-journal/institute/' + instituteId + '/add',
  monthly_return_journal_get    : url + 'monthly-return-journal/institute/' + instituteId + '/list',
  insights_get                  : url + 'monthly-return-insight/institute/' + instituteId + '/list',
}
