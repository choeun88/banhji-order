/*
 * Last modified : 3/17/21, 4:49 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
const axios = require('axios')
const apiUrl = require('@/apiUrl.js')
// List
module.exports.getV2 = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.customer.customer_term_get, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// Save
module.exports.create = async function (data) {
    try {
        return await axios.post(apiUrl.customer.customer_term_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

// List credit limit usage
module.exports.creditUsage = async function (strFilter = '') {
    try {
        return await axios.get(apiUrl.customer.customer_credit_usage_get + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}