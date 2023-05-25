/*
 * Last modified : 3/17/21, 11:10 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const url          = ' https://sqm7qrp4c7.execute-api.ap-southeast-1.amazonaws.com/dev/'

module.exports = {
  project_post          : url + 'project/institute/' + instituteId + '/add',
  project_get           : url + 'project/institute/' + instituteId + '/list',

  //sale plan
  sale_plan_post        : url + 'sale-plan/institute/' + instituteId + '/add',
  sale_plan_get         : url + 'sale-plan/institute/' + instituteId + '/list',
}
