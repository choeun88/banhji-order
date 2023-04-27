const baseHandler = require('@/scripts/baseHandler.js')
const apiUrl = require('@/apiUrl.js') 
const axios = require('axios')

// GET BY ID
module.exports.getOne = async (id) => {
    baseHandler.getOne(apiUrl.banking + '/banks', id).then(result=>{
        return result.data;
    })
}
// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.banking + '/banks')
        
        return response;
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.banking + '/banks', data)
        
        return response;
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.createQr = async function (bankName, data) {
    try {
        const response = await axios.post(apiUrl.bank_qr + bankName, data)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}