const axios 	= require('axios')
const apiUrl 	= require('../apiUrl.js')

// GET CURRENCY LIST
module.exports.getCurrencyList = async () => {
    try {
        const response = await axios.get(apiUrl.currencies)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET REPORTING CURRENCY
module.exports.getReportingCurrency = async (params) => {
    try {
        const response = await axios.get(apiUrl.reporting_currency_get + params.params.type +'/'+ params.params.year)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET FUNCTIONAL CURRENCY
module.exports.getFunctionalCurrency = async () => {
    try {
        const response = await axios.get(apiUrl.xchange_get + 'fnc')

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET TRANSACTION CURRENCY
module.exports.getTransactionCurrency = async () => {
    try {
        const response = await axios.get(apiUrl.xchange_get + 'txn')

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.xchange_get + 'txn')

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET BY DATE
module.exports.getByDate = async (date, code) => {
    try {
        date = '';
        code = '';
        const response = await axios.get(apiUrl.xchange_get + 'txn' +date+code);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}