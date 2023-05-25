/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url = baseUrl + '/warehouse-service/'

module.exports = {
    warehouseCreate                                : url + 'warehouses/' + instituteId + '/create',
    warehouseGet                                   : url + 'warehouses/' + instituteId + '/get',
    warehouseGets                                  : url + 'warehouses/' + instituteId + '/list'
}