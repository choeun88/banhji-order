const apiUrl = require('@/apiUrl.js') 
const axios = require('axios')

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.tax_setting.tax_list_get)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}