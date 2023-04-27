const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.item.discount_item_get + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// GET LIST BY DAWINE
module.exports.getAll = async (strType = '') => {
    try {
        const response = await axios.get(apiUrl.item.discount_item_get + strType);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// URL
module.exports.getURL = function (strFilter = '') {
    try {
        // const response = apiUrl.product.discount_item_get

        return apiUrl.item.discount_item_get + strFilter
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.item.discount_item_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.discountItemReport = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.item.discount_item_report, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.saleChannelReport = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.item.sale_channel_report, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.saleUnitReport = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.item.sale_unit_report, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.otherChargeReport = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.item.other_charge_report, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.priceLevelReport = async function (strFilter = '') {
    try {
        const response = await axios.post(apiUrl.item.price_level_report , strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}