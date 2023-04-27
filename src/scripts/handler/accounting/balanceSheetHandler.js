/* Statement Of Financial Position */
const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.balance_sheet_get;

// GET BALANCE SHEET
module.exports.getBalanceSheet = async (params, secondary="") => {
    try {
        const response = await axios.get(urlPath + secondary, params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BY SEGMENTS
module.exports.getBySegments = async (asOfDate, segIds, secondary="") => {
    try {
        let requests = [];
        for (const segId of segIds) {
            let request = await axios.get(urlPath + secondary, {
                params: {
                    as_of_date : asOfDate,
                    group_by: "1",
                    segment_uuid: segId,
                },
            })

            /* Add requests */
            requests.push(request);
        }

        let responses = await Promise.all(requests);

        let results = [];
        for (let i = 0; i < segIds.length; i++) {
            const element = responses[i];
            results.push(element.data);
        }
        return results;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BY BUSINESS UNIT
module.exports.getByBusinessUnit = async (params, location_id) => {
    try {
        const response = await axios.get(urlPath + `/bu/${location_id}`, params);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}