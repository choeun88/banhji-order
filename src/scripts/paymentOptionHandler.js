const axios = require('axios');
const apiUrl = require('../apiUrl.js');

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.setting.payment_option_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST BY DAWINE
module.exports.getAll = async (strFilter = '') => {
    try {
        const response = await axios.get(apiUrl.setting.payment_option_get + strFilter);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// Get List
module.exports.list = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.setting.payment_option_get + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Detail
module.exports.detail = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.setting.payment_option_detail + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}