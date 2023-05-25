const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// Search url
module.exports.url = function () {
    try {
        return apiUrl.item.service_item_list
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.product_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
// catalog search
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.item.service_item_list)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getOne = async function (id) {
    try {
        const response = await axios.get(apiUrl.item.service_item_get + `/${id}`)

        return response.data.data[0]
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.filter = async function (strFilter) {
    try {
        let response = await axios.get(apiUrl.item.service_item_filter + strFilter)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.item.service_item_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// update
module.exports.update = async (id, data) => {
    try {

        const response = await axios.put(apiUrl.product.product_put + id, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

//
// Images upload
module.exports.upload = async function (data) {
    try {
        const response = await axios.post(apiUrl.item.service_upload, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Import service
module.exports.importServiceItem = async function (data) {
    try {
        const response = await axios.post(apiUrl.item.import_service, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}