const axios = require('axios');
const apiUrl = require('@/apiUrl.js');

// GET LIST
module.exports.getAll = async function () {
    try {
        const response = await axios.get(apiUrl.setting.prefix_get)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// get by type
module.exports.get = async function (type) {
    try {
        const response = await axios.get(apiUrl.setting.prefix_function_get + type)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.update = async (sk,data) => {
    try {
        const response = await axios.put(apiUrl.prefix_put + sk, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Update one
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.setting.prefix_post, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LAST NUMBER
module.exports.lastNumber = async (params) => {
    try {
        const response = await axios.get(apiUrl.accounting + "/journals/lastnumber", params)
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LAST NUMBER EXPENSE
module.exports.lastNumberExpense = async (params) => {
    try {
        const response = await axios.get(apiUrl.expenses + "/expense/summary/lastnumber", params)
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}