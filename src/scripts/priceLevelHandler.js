const axios = require('axios')
const apiUrl = require('../apiUrl.js')


// List
module.exports.get = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.price_promotion.price_level_get + strFilter)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.price_promotion.price_level_post, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Price Level Type
// save
module.exports.priceLevelTypeCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.price_promotion.price_level_type_post, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Price Level Type
// List
module.exports.priceLevelTypeList = async function () {
    try {
        const response = await axios.get(apiUrl.price_promotion.price_level_type_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}