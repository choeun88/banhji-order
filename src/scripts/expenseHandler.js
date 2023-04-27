const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.expenses + '/expenses';

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await axios.get(urlPath + `/${id}`)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST
module.exports.getAll = async (params) => {
    try {
        const response = await axios.get(urlPath, params);
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(urlPath, data)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE ALL
module.exports.saveAll = async (expenses) => {
    try {
        let requests = [];
        for (let i = 0; i < expenses.length; i++) {
            let request = await axios.post(urlPath, expenses[i]);

            /* Add request */
            requests.push(request);
        }

        let responses = await Promise.all(requests);

        let results = [];
        for (let i = 0; i < expenses.length; i++) {
            const element = responses[i];
            results.push(element.data);
        }
        
        return results;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE BATCH
module.exports.saveBatch = async (expenses) => {
    try {
        let response = await axios.post(urlPath + "/batch", expenses);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}