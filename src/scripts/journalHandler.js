const axios 	= require('axios');
const apiUrl 	= require('@/apiUrl.js');

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await axios.get(apiUrl.journals + `/${id}`, {
            params : {
                request_for_entry: true
            }
        })
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET ENTRY DETAIL BY ACCOUNT { account_uuid }
module.exports.getEntryDetailByAccount = async (id, params) => {
    try {
        const response = await axios.get(apiUrl.accounts + `/${id}/entries`, params);
        
        let data = [];
        if (typeof response.data === "object") {
            data = response.data;
            data.entries_detail.forEach(value => {
                // Set dr/cr from amount
                let dr = '', cr = '';
                if(value.amount < 0){
                    cr = value.exchanged_amount * -1;
                }else{
                    dr = value.exchanged_amount;
                }

                value.id = value.journal_uuid;
                value.dr = dr;
                value.cr = cr;
            })
        }

        return data;
    } catch (error) {
        window.console.error(error);
    }
}

// GET JOURNAL BY PRIMARY CONTACT
module.exports.getJournalByPrimaryContact = async (id, params) => {
    try {
        const response = await axios.get(apiUrl.journals + `/primarycontact/${id}`, params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET JOURNAL BY TRANSACTION TYPE
module.exports.getJournalByTransactionType = async (type, params) => {
    try {
        const response = await axios.get(apiUrl.journals + `/transactions/${type}`, params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.journals, data);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}