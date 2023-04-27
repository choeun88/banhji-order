const axios 	= require('axios')
const apiUrl 	= require('../apiUrl.js')

// GET
module.exports.getSearch = async function (params) {
    try {
        const response = await axios.get(apiUrl.search_get, params)

        return response
    } catch (error) {
        window.console.error(error)
    }
}