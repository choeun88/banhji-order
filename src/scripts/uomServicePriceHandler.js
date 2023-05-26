const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.get = async function (id, strFilter = '') {
    try {
        const response = await axios.get(apiUrl.price_promotion.uom_price + id + '/list/' + strFilter)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (id, data) => {
    try {
        const response = await axios.post(apiUrl.price_promotion.uom_service_item_price_post + id + '/add', data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}