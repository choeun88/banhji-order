const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.price_promotion.uom_price + id + '/list')

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getUrlNew = function (id) {
    try {
        return apiUrl.price_promotion.uom_conversion_new + id + '/list'
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getUrl = function (id) {
    try {
        return apiUrl.price_promotion.uom_price + id + '/list'
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getURL = function (id, pricelevelId, type) {
    try {
        // const response = apiUrl.product.uom_price + id + '/list'

        return apiUrl.price_promotion.uom_price + id + '/list?plid=' + pricelevelId + '&type=' + type
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (id, data) => {
    try {
        const response = await axios.post(apiUrl.price_promotion.uom_price + id + '/add', data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// get uom by price level
module.exports.uomByPriceLevel = async function (id, pricelevelId) {
    try {
        const response = await axios.get(apiUrl.price_promotion.uom_price + id + '/list?plid=' + pricelevelId)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// item uom price by price level
module.exports.uomPriceByPriceLevelURL = (strFilter) => {
    try {
        return apiUrl.price_promotion.item_uomPrice_get + strFilter
    } catch (error) {
        window.console.error(error)
    }
}

// Stanndard Cost
module.exports.standardCost = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.price_promotion.standard_cost, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// Create standard cost
module.exports.standardCostAdd = async (data) => {
    try {
        return await axios.post(apiUrl.price_promotion.standard_cost_post, data)
    } catch (error) {
        window.console.error(error)
    }
}