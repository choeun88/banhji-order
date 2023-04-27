const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.bank_accounts;

// GET BY BANK ACCOUNT UUID
module.exports.getByBankAccountId = async (id) => {
    try {
        const response = await axios.get(urlPath + `/${id}/statements`);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(urlPath + '/bankstatements');
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data, isBatch = false) => {
    try {
        let saveBatch = '';
        if(isBatch){
            saveBatch = '/batch';
        }

        const response = await axios.post(urlPath + '/statements' + saveBatch, data);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LIST
module.exports.toBeReconcileEntries = async (params) => {
    try {
        const response = await axios.get(apiUrl.banking + '/tobereconcileentries', params);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}