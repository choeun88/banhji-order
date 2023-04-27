const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.accounting_report;

// GET
module.exports.getTrialBalance = async (params) => {
    try {
        const response = await axios.get(urlPath + '/reports/tbreport', params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BU
module.exports.getTrialBalanceBU = async (params, location_uuid) => {
    try {
        const response = await axios.get(urlPath + `/reports/tbreport/bu/${location_uuid}`, params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}