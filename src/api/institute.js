/*
 * Last modified : 2/19/21, 10:06 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
const myUrl = require('@/url')
const baseUrl = myUrl.url
const url = baseUrl + '/users/'
// const url = 'https://dev-apis.banhji.com/users/'
const businessData = 'https://myconnect.s3-ap-southeast-1.amazonaws.com/dropdown.json'
const taxRegime = 'https://gist.githubusercontent.com/Darith-Mokpost/1e090cb5ef4576ef65ed6e6f71f4a97c/raw/80189d274d82b7b1369d06457ad66d5676370ab3/taxRegime.json'

module.exports = {
  company_get: url + 'institutes/',
  company_getOne: url,
  company_add: url + 'institutes/',
  role_get: url + 'user-role/institute/',
  plan_role_get: url + 'plan-role/institute/',
  save_image: url + 'saveimage',
  bt: businessData,
  sector_get: url + 'sector/sector',
  bo: url + 'bo/businessObject',
  taxRegime: taxRegime
}
