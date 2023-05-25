const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.item.other_charge_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// URL
module.exports.getURL = function () {
    try {
        // const response = apiUrl.product.discount_item_get

        return apiUrl.item.other_charge_get
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.item.other_charge_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}