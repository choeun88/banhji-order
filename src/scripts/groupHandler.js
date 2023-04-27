const axios = require('axios')
const apiUrl = require('../apiUrl.js')


// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.group_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.product.group_post, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// update
module.exports.update = async (id, data) => {
    try {
        const response = await axios.put(apiUrl.product.group_put + id, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List v2
module.exports.getv2 = async function (param) {
    try {
        return await axios.post(apiUrl.product.group_getv2, param)
    } catch (error) {
        window.console.error(error)
    }
}
// List v2
module.exports.getAllv2 = async function (param) {
    try {
        return await axios.post(apiUrl.product.group_getallv2, param)
    } catch (error) {
        window.console.error(error)
    }
}