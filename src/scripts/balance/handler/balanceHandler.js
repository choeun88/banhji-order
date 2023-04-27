const axios = require('axios')
const apiUrl = require('@/apiUrl')

// last balance [balance,deposit] of customer/vendor
module.exports.lastBalance = async (strPattern = '') => { 
    try {
        return await axios.get(apiUrl.balance.last_balance + strPattern)
    } catch (error) {
        window.console.error(error)
    }
}
// List all customer/vendor has transaction balance
module.exports.customerVendors =  (strPattern = '') => { 
    try {
        return apiUrl.balance.customer_vendor + strPattern
    } catch (error) {
        window.console.error(error)
    }
}

// List all customer/vendor has transaction balance
module.exports.getCustomerVendors =  async(strPattern = '') => { 
    try {
        return await axios.get(apiUrl.balance.customer_vendor + strPattern)
    } catch (error) {
        window.console.error(error)
    }
}
