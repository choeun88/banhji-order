const axios = require('axios')
const apiUrl = require('../apiUrl.js')
// const store		= require('../institute.js')

// INITIAL


// GET LIST
module.exports.getAll = async function () {
    try {
        const response = await axios.get(apiUrl.product.item_type_get)
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// get by type
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.category_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.product.category_post, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// get v2 by page
module.exports.getv2 = async function (param) {
    try {
        return await axios.post(apiUrl.product.category_getv2, param)
    } catch (error) {
        window.console.error(error)
    }
}
// get v2 all
module.exports.getAllv2 = async function (param) {
    try {
        return await axios.post(apiUrl.product.category_getAllv2, param)
    } catch (error) {
        window.console.error(error)
    }
}