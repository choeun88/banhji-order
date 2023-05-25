const axios = require('axios')
const apiUrl = require('@/apiUrl')

// List
module.exports.url =  function (strFilter) {
    try {
        let response = ''
        if (strFilter !== undefined) {
            response = apiUrl.billing.recurring_invoice_get + '/' + strFilter
        } else {
            response = apiUrl.billing.recurring_invoice_get
        }
        window.console.log(response)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.list = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.recurring_invoice_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.recurring_invoice_get)
        }
        return response

    } catch (error) {
        window.console.error(error)
    }
}
// create
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.recurring_invoice_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}