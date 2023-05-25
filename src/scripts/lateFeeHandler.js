const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function (strFilter = '') {
    try {
        return await axios.get(apiUrl.item.late_fee_get + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// URL
module.exports.getURL = function () {
    try {
        // const response = apiUrl.product.discount_item_get

        return apiUrl.item.late_fee_get
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.item.late_fee_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}