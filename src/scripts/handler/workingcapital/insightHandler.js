const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

// GET
module.exports.getInsights = async () => {
    try {
        const response = await axios.get(apiUrl.accounting_report + '/reports/workingcaptial/dashboard');

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET CASH AND BANK BALANCE
module.exports.getCashAndBankBalance = async () => {
    try {
        const response = await axios.get(apiUrl.working_capital + "/cashandbankbalance");

        return response;
    } catch (error) {
        window.console.error(error);
    }
}