const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.uom_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
// GET LIST BY DAWINE
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.product.uom_get);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
module.exports.getUrl = function () {
    try {
        return apiUrl.product.uom_get
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.product.uom_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// update
module.exports.update = async (id, data) => {
    try {
        const response = await axios.put(apiUrl.product.uom_put + id, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}