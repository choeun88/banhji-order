const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

// GET BY ID
module.exports.getByBankAccountId = async (id) => {
    try {
        const response = await axios.get(apiUrl.banking + `/banking/${id}/mapping`)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET RULE LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.banking + '/banking/rules')
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.banking + '/banking/rules', data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}