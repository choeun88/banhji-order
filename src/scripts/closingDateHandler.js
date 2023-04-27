const axios = require('axios')
const apiUrl = require('../apiUrl.js')


// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.setting.closing_date_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.last = async function () {
    try {
        const response = await axios.get(apiUrl.setting.closing_date_last)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.setting.closing_date_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}