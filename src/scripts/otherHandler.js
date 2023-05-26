const axios = require('axios');
const instance = axios.create();
const apiUrl = require('../apiUrl.js')
const unknown = require('../api/unknown')

// bank
module.exports.bank = function () {
    try {
        const data = unknown.bank
        // const response = await axios.get(unknown.gender)

        return data
    } catch (error) {
        window.console.error(error)
    }
}
// Employee Type
module.exports.employeeType = function () {
    try {
        const employeeType = unknown.employeeType
        // const response = await axios.get(unknown.gender)

        return employeeType
    } catch (error) {
        window.console.error(error)
    }
}
// Gender
module.exports.gender = function () {
    try {
        const gender = unknown.gender
        // const response = await axios.get(unknown.gender)

        return gender
    } catch (error) {
        window.console.error(error)
    }
}
// maritalStatus
module.exports.maritalStatus = function () {
    try {
        const maritalStatus = unknown.maritalStatus
        // const response = await axios.get(unknown.gender)

        return maritalStatus
    } catch (error) {
        window.console.error(error)
    }
}
// paymentPeriod
module.exports.paymentPeriod = function () {
    try {
        const data = unknown.paymentPeriod
        // const response = await axios.get(unknown.gender)

        return data
    } catch (error) {
        window.console.error(error)
    }
}
// Nationality
module.exports.nationality = async function () {
    try {
        const response = await instance.get(unknown.nationality)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.country = async function () {
    try {
        const response = await instance.get(apiUrl.other.country)

        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.customerTypeNature = async function () {
    try {
        // const response = await axios.get(apiUrl.other.customer_type_nature_type)
        const response = await axios.get(apiUrl.customer.customer_nature_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.customerGroupPriceLevel = async function () {
    try {
        const response = await axios.get(apiUrl.other.customer_group_price_level)

        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.customerBillTo = async function () {
    try {
        const response = await instance.get(apiUrl.other.customer_bill_to)

        return response.data
    } catch (error) {
        window.console.error(error)
    }
}

// institute list
// List
module.exports.institute = async function () {
    try {
        const response = await axios.get(apiUrl.other.institutes)

        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
// get bank partner
module.exports.bankParner = async function () {
    try {
        const response = await axios.get(unknown.connectedBanks)

        return response.data
    } catch (error) {
        window.console.error(error)
    }
}


