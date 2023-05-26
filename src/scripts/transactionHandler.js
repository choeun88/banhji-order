const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function () {
    try {
        return await axios.get(apiUrl.transaction.sale_quote_get)
    } catch (error) {
        window.console.error(error)
    }
}

// view
module.exports.view = async function (id) {
    try {
        return await axios.get(apiUrl.transaction.transaction_get + '/' + id)
    } catch (error) {
        window.console.error(error, 'here')
    }
}


// save
module.exports.create = async (data) => {
    try {
        return await axios.post(apiUrl.transaction.transaction_post, data)
    } catch (error) {
        window.console.error(error)
    }
}
// Update
module.exports.update = async (data) => {
    try {
        return await axios.post(apiUrl.transaction.transaction_update, data)
    } catch (error) {
        window.console.error(error)
    }
}
// History List
module.exports.history = async function (id) {
    try {
        return await axios.get(apiUrl.transaction.transaction_history + '/' + id)
    } catch (error) {
        window.console.error(error)
    }
}

//search
module.exports.search = async (data) => {
    try {
        return await axios.post(apiUrl.transaction.transaction_search, data)
    } catch (error) {
        window.console.error(error)
    }
}
//search url
module.exports.searchURL = (strFilter) => {
    try {
        return apiUrl.transaction.txn_search + strFilter
    } catch (error) {
        window.console.error(error)
    }
}
//Filter by Customer Id / location Id / Segment Id / PriceLevel Id
module.exports.transactionFilter = async (strFilter) => {
    try {
        return await axios.get(apiUrl.transaction.transaction_filter + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

// delete transaction
module.exports.delete = async (data) => {
    try {
        return await axios.post(apiUrl.transaction.transaction_delete, data)
    } catch (error) {
        window.console.error(error)
    }
}
// delete transaction Sale Order
module.exports.deleteSaleOrder = async (data) => {
    try {
        return await axios.post(apiUrl.transaction.transaction_saleOrder_delete, data)
    } catch (error) {
        window.console.error(error)
    }
}

// BY DAWINE
// GET BY FILTER
module.exports.getByFilters = async (params) => {
    try {
        return await axios.get(apiUrl.transaction.txn_search, params)
    } catch (error) {
        window.console.error(error)
    }
}

// BY Transaction
// customer/vendor by Id 
module.exports.byTransaction = () => {
    try {
        return apiUrl.transaction.by_transaction
    } catch (error) {
        window.console.error(error)
    }
}
// BY Transaction
// customer/vendor by Id 
module.exports.byTransactions = async (params) => {
    try {
        // return apiUrl.transaction.by_transaction
        return await axios.get(apiUrl.transaction.by_transaction + params)
    } catch (error) {
        window.console.error(error)
    }
}