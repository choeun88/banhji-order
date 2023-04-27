const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.working_capital + '/reimbursements';

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await axios.get(urlPath + `/${id}`);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LIST
module.exports.getAll = async (params) => {
    try {
        const response = await axios.get(urlPath, params);
        
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