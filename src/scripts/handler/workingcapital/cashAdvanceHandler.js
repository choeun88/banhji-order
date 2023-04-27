const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const baseHandler = require('@/scripts/baseHandler.js');
const urlPath = apiUrl.working_capital + '/cashadvances';

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await baseHandler.getOne(urlPath, id);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}
// GET LIST BY PARAMS
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

// GET BY PRIMARY CONTACT
module.exports.getByEmployeeId = async (id) => {
    try {
        const response = await axios.get(urlPath + `/employee/${id}`);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}