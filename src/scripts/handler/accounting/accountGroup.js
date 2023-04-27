const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.account_groups;

// GET ACCOUNT GROUP BY ACCOUNT TYPE NUMBER
module.exports.getByAccountType = async (typeNumber) => {
    try {
        const response = await axios.get(apiUrl.account_types + `/${typeNumber}/groups`);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(urlPath);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}