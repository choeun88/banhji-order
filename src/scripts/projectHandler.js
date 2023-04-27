const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function (strFilter = '') {
    try {
        const response = await axios.post(apiUrl.customer.project_get , strFilter)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST (BY DAWINE)
module.exports.getAll = async () => {
    try {
        const response = await axios.post(apiUrl.customer.project_get, {
            "key": {},
            "search": ""
        });

        return response;
    } catch (error) {
        window.console.error(error)
    }
}
// GET
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.customer.project_get + '/' + id)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.customer.project_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Get project by customer
module.exports.getByCustomer = async function (id='') {
    try {
        const response = await axios.get(apiUrl.customer.project_by_customer_get + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Get project by supplier
module.exports.getBySupplier = async function (id) {
    try {
        const response = await axios.get(apiUrl.customer.project_by_supplier_get + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Get project report detail
module.exports.projectReport = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.customer.customer_project_report + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Get project report summary
module.exports.projectReportSummary = async function (strFilter = '') {
    try {
        const response = await axios.post(apiUrl.customer.customer_project_report_summary , strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Get project report complete
module.exports.projectCompletion = async function (data = '') {
    try {
        const response = await axios.post(apiUrl.customer.customer_project_completion, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.projectURL = function (strFilter = '') {
    try {
        const response = apiUrl.customer.project_get + strFilter
        return response
    } catch (error) {
        window.console.error(error)
    }
}