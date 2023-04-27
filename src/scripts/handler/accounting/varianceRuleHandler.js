const baseHandler 	= require('@/scripts/baseHandler.js');
const apiUrl 	= require('@/apiUrl.js');
const axios 	= require('axios');

// GET BY ID
module.exports.getOne = async (id) => {
    baseHandler.getOne(apiUrl.variance_rule_setting, id)
    .then(result => {
        return result.data;
    })
}

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.variance_rule_setting);
        
        return response;
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.variance_rule_setting, data);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}