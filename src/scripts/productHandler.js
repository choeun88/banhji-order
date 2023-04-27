const axios = require('axios')
const apiUrl = require('../apiUrl.js')


// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.product_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getOne = async function (id) {
    try {
        const response = await axios.get(apiUrl.product.product_get + `/${id}`)

        return response.data.data[0]
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.filter = async function (id, search) {
    try {
        let response = ''
        if (search === '' || search === null || search === undefined) {
            response = await axios.get(apiUrl.product.product_filter + `${id}`)
        } else {
            response = await axios.get(apiUrl.product.product_filter + `${id}/${search}`)
        }
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.product.product_post, data)
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
// Product Category Segment report
module.exports.categorySegmentReport = async function (strFilter = '') {
    try {
        return await axios.get(apiUrl.product.product_category_segment_report + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// Product Center v2
module.exports.center = async (data) => {
    try {
        return await axios.post(apiUrl.product.product_center, data)
    } catch (error) {
        window.console.error(error)
    }
}
// Product Center URL v2
module.exports.centerURL =  () => {
    try {
        return apiUrl.product.product_center
    } catch (error) {
        window.console.error(error)
    }
}
// Import Product
module.exports.importProduct = async (data) => {
    try {
        return await axios.post(apiUrl.product.import_product, data)
    } catch (error) {
        window.console.error(error)
    }
}