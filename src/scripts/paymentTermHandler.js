const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.setting.payment_setting_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}