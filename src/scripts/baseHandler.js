const axios = require('axios')
// GET BY ID
module.exports.getOne = async (baseUrl, id) => {
    try {
        return await axios.get(baseUrl + `/${id}`);
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST
module.exports.getAll = async (baseUrl) => {
    try {
        return await axios.get(baseUrl)
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (baseUrl, data) => {
    try {
        window.console.log(baseUrl);
        // store.default.commit(vueXKey, data)
        return await axios.post(baseUrl, data, {headers:{'Content-Type': 'application/json', 'accept':'application/json',
        'Access-Control-Request-Headers': 'Content-Type, Authorization, accept',
        'method': 'POST, OPTIONS'}})
    } catch (error) {
        window.console.error(error)
    }
    
}

// active currency or functional currency that allowed by company
module.exports.get = async function (baseUrl) {
    try {
        const response = await axios.get(baseUrl)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}