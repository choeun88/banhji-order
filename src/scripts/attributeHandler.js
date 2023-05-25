const axios = require('axios')
const apiUrl = require('../apiUrl.js')


// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.attribute_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.product.attribute_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// update
module.exports.update = async (id, data) => {
    try {
        const response = await axios.put(apiUrl.product.attribute_put + id, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Create 
module.exports.natureCreate = async function (data) {
    try {
        return await axios.post(apiUrl.product.nature_post, data)
    } catch (error) {
        window.console.error(error)
    }
}
// List 
module.exports.natureList = async function (strFilter = '') {
    try {
        return await axios.get(apiUrl.product.nature_get + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}