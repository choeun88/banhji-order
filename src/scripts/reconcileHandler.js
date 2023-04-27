const axios = require('axios')
const baseHandler = require('@/scripts/baseHandler.js');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.working_capital + '/reconciles';

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await baseHandler.getOne(urlPath, id);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await baseHandler.getAll(urlPath);
        
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

// GET BY ACCOUNT ID
module.exports.getByAccountId = async (id) => {
    try {
        const response = await axios.get(`${urlPath}/account/${id}`);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BANK FEED
// function getBankTransaction() {
//     return axios.get(apiUrl.bank_feeds)
// }
   
// function getBanhjiTransaction(id, params) {
//     return axios.get(apiUrl.accounts + `/${id}/entries`, params)
// }
module.exports.getBankFeed = async (id, params) => {
    try {
        // Promise.all([
        //     getBankTransaction(),
        //     getBanhjiTransaction(id, params)
        // ])
        // .then(function (results) {
        //     // const acct = results[0]
        //     // const perm = results[1]
        //     window.console.log(results)
        //     return results
        // })
        let bankResponse = await axios.get(apiUrl.bank_feeds)
        let bankRuleResponse = await axios.get(apiUrl.banking + '/rules')
        let banhjiResponse = await axios.get(apiUrl.accounts + `/${id}/entries`, params)

        return {
            bankTxns    : bankResponse.data,
            bankRules   : bankRuleResponse.data,
            banhjiTxns  : banhjiResponse.data,
        }
    } catch (error) {
        window.console.error(error)
    }
}