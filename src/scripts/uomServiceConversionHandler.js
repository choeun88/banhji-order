const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.price_promotion.uom_service_conversion + id + '/list')

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (id, data) => {
    try {
        const response = await axios.post(apiUrl.price_promotion.uom_service_conversion + id + '/add', data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}