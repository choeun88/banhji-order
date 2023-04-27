const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.accounting_report

// GET
module.exports.getGeneralLedgerReport = async (params) => {
    try {
        const response = await axios.get(urlPath + "/reports/glreport", params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}