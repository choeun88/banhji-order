const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await axios.get(apiUrl.bank_accounts + `/${id}`);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.bank_accounts);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.bank_accounts, data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET TYPE LIST
module.exports.getAllTypes = async () => {
    try {
        const response = await axios.get(apiUrl.bank_account_types);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}