const axios = require('axios')
const apiUrl = require('../apiUrl.js')


// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.tax_setting.tax_list_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}