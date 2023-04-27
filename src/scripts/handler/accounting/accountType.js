const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.account_types;

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(urlPath);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(urlPath, data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}