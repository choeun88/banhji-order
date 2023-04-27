const apiUrl 	= require('@/apiUrl.js') 
const axios 	= require('axios')

// GET BY ID
module.exports.getByEntityType = async (entityType) => {
    try {
        const response = await axios.get(apiUrl.entity_type + `/${entityType}/types`)
        
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (entityType, data) => {
    try {
        const response = await axios.post(apiUrl.entity_type + `/${entityType}/types`, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}