const baseHandler = require('@/scripts/baseHandler.js')
const apiUrl = require('@/apiUrl')

const axios = require('axios')
const instance = axios.create();

// const currencyType = {
//     FUNCTIONAL_CURRENCY: 'fun-c',
//     TRANSACTION_CURRENCY: 'txn-c',
//     REPORTING_CURRENCY: 'rpt-c',
//     TAX_EXCHANGE_CURRENCY: 'tax-c',
// }

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.currency.currency_get + 'fun-c');

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET JSON FILE
module.exports.getJson = async () => {
    try {
        return await instance.get(apiUrl.currency.currency_json);
    } catch (error) {
        window.console.error(error);
    }
}

// active currency or functional currency that allowed by company
module.exports.get = async function () {
    try {
        return await baseHandler.get(apiUrl.currency.currency_get)
    } catch (error) {
        window.console.error(error)
    }
}

// active currency or functional currency that allowed by company
module.exports.list = async function (type) {
    try {
        return await axios.get(apiUrl.currency.currency_get + type)
    } catch (error) {
        window.console.error(error)
    }
}

//
module.exports.reportingPeriod = async function (type, fy) {
    try {
        return await axios.get(apiUrl.currency.reporting_period_get + type + '/' + fy)
    } catch (error) {
        window.console.error(error)
    }
}

// Create Currency
module.exports.create = async (data) => {
    try {
        return await axios.post(apiUrl.currency.currency_post, data)
    } catch (error) {
        window.console.error(error)
    }
}
// get last rate of transaction Currency
// currency?type=txn-c&date=2021-02-25&code=KHR
module.exports.getLastExchangeRateByDate = async (date, code='') => {
    try {
        let params = {
            type: 'txn-c',
            date: date
        }

        if(code !== ''){
            params.code = code;
        }

        const response = await axios.get(apiUrl.currency.exchange_rate, {
            params: params
        })

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
module.exports.getLastExchangeRateTaxByDate = async (date, code) => {
    try {
        const response = await axios.get(apiUrl.currency.exchange_rate, {
            params: {
                type: 'tax-c',
                date: date,
                code: code,
            }
        })

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
